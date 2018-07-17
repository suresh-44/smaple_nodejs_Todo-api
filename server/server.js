const express =require('express')
const bodyParser = require('body-parser') // it will cnver json into js object !@----it will parse the body that was send from client

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {Users} = require('./models/users')

var app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/todo', (req, res) => {
  
  var todo = new Todo({
        text : req.body.text
    })

    todo.save().then(doc => {
        res.status(200).send(doc)
    }, err => {
        res.status(400).send(err)
    })
})

app.get('/todo', (req, res) =>{
    Todo.find().then(todo => {
        res.send({todo})
    }, err => {
        res.status(400).send(err)
    })
})

app.listen(port, ()=> {
    console.log(`Started up at the port ${port}`)
})

module.exports.app = app;