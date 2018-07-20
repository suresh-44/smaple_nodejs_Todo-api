const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

var UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim  : true,
        minlength : 1,
        unique : true,
        validate : {
            validator : validator.isEmail,
            message : '{VALUE} is not a valid email'
        }
    },
    password :{
        type : String,
        required : true,
        minlength : 5,
    },
    tokens : [{
        access : {
            type :String,
            required : true
        },
        token : {
            type :String,
            required : true
        }
    }]
})

UserSchema.methods.toJSON = function () {
    var user = this
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () { 
    var user = this
    var access = 'auth'
    var token   = jwt.sign({_id : user._id.toHexString(), access}, '987qwerty').toString()

    user.tokens.push({access, token})

    return user.save().then(() => {
        return token
    })
}

var Users = mongoose.model('users', UserSchema)

module.exports = {Users}