const expect = require('expect')
const request = require('supertest')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

beforeEach((done) => {
  Todo.remove({}).then(() => done())
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

        Todo.find().then(todo => {
          expect(todo.length).toBe(1)
          expect(todo[0].text).toBe(text)
          done()
        }).catch(e => done(e))
      })
  })
})