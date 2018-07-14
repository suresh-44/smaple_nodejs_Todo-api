const mongoose = require('mongoose')

var Users = mongoose.model('users',{
    email : {
        type : String,
        require : true,
        trim  : true,
        minlenth : 1
    }
})

module.exports = {Users}