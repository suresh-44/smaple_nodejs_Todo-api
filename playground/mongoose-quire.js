const {ObjectId} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')

const id = '5b4cc5185d838a5708f8c20c'

if(!ObjectId.isValid(id)){
  console.log('Id is not valid')
}

// Todo.find({
//   _id : id
// }).then(todos => {
//   console.log('Todos :', todos)
// })

// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log('Todo :', todo)
// })

Todo.findById(id).then(todo => {
    if(!todo){
      return console.log('Id not found')
    }
    console.log('TODO by id :',todo)
  }).catch(e => console.log(e))

