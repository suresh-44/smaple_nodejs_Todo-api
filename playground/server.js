const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/TestTodoApp')

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
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
    text : ''
})

newTodo.save()
        .then(res => console.log('Todo is saved \n',res),
                err => console.log('Unable to saved'))