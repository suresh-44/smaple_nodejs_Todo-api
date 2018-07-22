require('./config/config')

const _ = require('lodash')
const express =require('express')
const bodyParser = require('body-parser') // it will cnver json into js object !@----it will parse the body that was send from client
const {ObjectId} = require('mongodb')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {Users} = require('./models/users')
const {authenticate} = require('./middleware/authenticate')

var app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/todo', authenticate ,(req, res) => {
  
  var todo = new Todo({
        text : req.body.text,
        _creator : req.user._id
    })

    todo.save().then(doc => {
        res.status(200).send(doc)
    }, err => {
        res.status(400).send(err)
    })
})

app.get('/todo', authenticate ,(req, res) =>{
    Todo.find({
        _creator : req.user._id
    }).then(todo => {
        res.send({todo})
    }, err => {
        res.status(400).send(err)
    })
})

app.get('/todo/:id', (req, res) => {
    const id = req.params.id

    if(!ObjectId.isValid(id)){
        return res.status(404).send()
    }

    Todo.findOne({
        _id : id,
        _creator : req.user._id
    }).then(todo => {
        if(!todo) {
            res.status(404).send()
        }

        res.send({todo})
    }).catch(e => res.status(400).send())
})

app.delete('/todo/:id', authenticate ,(req, res) => {
    const id = req.params.id
    if(!ObjectId.isValid(id)) {
        return res.status(404).send()
    }

    Todo.findOneAndRemove({
        _id : id,
        _creator : req.user._id
    }).then(todo => {
        if(!todo){
            return res.status(404).send({id})
        }

        res.send({todo})
    }).catch(err => res.status(400).send())
})

app.patch('/todo/:id', authenticate ,(req, res) => {
    const id = req.params.id
    const body = _.pick(req.body, ['text', 'completed'])

    if(!ObjectId.isValid(id)) {
        return res.status(404).send()
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime()
    } else {
        body.completed = false
        body.completedAt = null
    }

    Todo.findOneAndUpdate({
        _id : id,
        _creator : req.user._id
    },
    {$set : body},
         {new: true})
        .then(todo=> {
             if(!todo){
                 return res.status(404).send()
                }

                res.send({todo})
        })
        .catch(err => res.status(400).send(err))
 })

/*===================================================
                        USERS
=====================================================*/

 app.post('/user', (req, res)=> {
   var body = _.pick(req.body, ['email', 'password'])
   var user = new Users(body)

   user.save().then(() => {
     return user.generateAuthToken()
   }).then((token) => {
     res.header('x-auth', token).send(user)
   }).catch(err => {
     res.status(400).send(err)
   })
 })

 app.get('/user/me',authenticate, (req, res) => {
    res.send(req.user)
 })

app.post('/user/login', (req, res) => {
    var {email, password} = _.pick(req.body, ['email', 'password'])

    Users.findByCrendentials(email, password).then(user => {
        return user.generateAuthToken().then(token => {
            res.header('x-auth', token).send(user)
        })
    }).catch(err => res.status(400).send(err))
  
})

app.delete('/user/me/token', authenticate, (req, res) => {
    
    req.user.removeToken(req.token).then(() => {
        res.status(200).send()
    }, () => {
        res.status(400).send()
    })
})

app.listen(port, ()=> {
    console.log(`Started up at the port ${port}`)
})

module.exports.app = app