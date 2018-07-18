/*=======================================
      >npm run test-watch
==========================================*/

const expect = require('expect')
const request = require('supertest')
const {ObjectId} = require('mongodb')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

const todo = [{
    _id : new ObjectId(),
    text: 'something to do1'
  },
  {
    _id : new ObjectId(),
    text : 'somethinf to do2'
  }
]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todo)
  }).then(() => done())
})

describe('POST /todos', () => {
  it('should create new todo', done => {
    var text = 'Testing application'

    request(app)
      .post('/todo')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if(err){
          return done(err)
        }

        Todo.find({text}).then(todo => {
          expect(todo.length).toBe(1)
          expect(todo[0].text).toBe(text)
          done()
        }).catch(e => done(e))
      })
  })

  it('should not create todo with invalid body data', done => {
    request(app)
      .post('/todo')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err)
        }

        Todo.find().then(todo=> {
          expect(todo.length).toBe(todo.length)
          done()
        }).catch(err => done(err))
      })
  })
})

describe('GET /todo', () => {
  it('should get all todo', done => {
    request(app)
      .get('/todo')
      .expect(200)
      .expect(res => {
        expect(res.body.todo.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /todo/:id', () => {
  it('should return todo doc', done => {
    request(app)
      .get(`/todo/${todo[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todo[0].text)
      })
      .end(done)
  })

  it('should return 404 if todo is not found', (done) => {
    const hexId = new ObjectId().toHexString()

    request(app)
      .get(`/todo/${hexId}`)
      .expect(404)
      .end(done)
  })

  it('should return 404 non object ids', done => {
    request(app)
      .get('/todo/123456')
      .expect(404)
      .end(done)
  })
})

describe('DELETE /todo/:id', () => {

  it('should remove a todo' , done => {
    const hexId = todo[0]._id.toHexString()
    
    request(app)
      .delete(`/todo/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todo[0].text)
      })
      .end((err, res) => {
        if(err){
          return done(err)
        }

        Todo.findById(hexId).then(todo => {
          expect(todo).toNotExist()
          done()
        }).catch(err => done(err))
      })
  })

  it('should return 404 if todo not found' , done => {
    request(app)
      .delete(`/todo/${new ObjectId().toHexString()}`)
      .expect(404)
      .end(done)
  })

  it('should return 404 if object id id not valid', (done) => {
    request(app)
      .delete('/todo/123456789')
      .expect(404)
      .end(done)
  })
})