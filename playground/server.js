const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/TodoApp')

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        require: true,
        minlenth: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
})

// var newTodo = new Todo({
//     text : 'Finish NodeJs course',
//     completed: false
// })

var newTodo = new Todo({
    text: 'React course',

})

newTodo.save().then(res => console.log('Todo is saved \n',
                 JSON.stringify(res, undefined, 4)),
                 err => console.log('Unable to saved'))