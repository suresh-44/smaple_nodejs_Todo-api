const mongoose = require('mongoose')

var Users = mongoose.model('users',{
    email : {
        type : String,
        required : true,
        trim  : true,
        minlength : 1
    }
})

module.exports = {Users}