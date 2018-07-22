const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

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

UserSchema.statics.findByToken = function(token){
    var User = this
    var decode;

    try {
        decode =  jwt.verify(token, '987qwerty')
    } catch (e) {
        return Promise.reject()
    }

    return User.findOne({
        '_id' : decode._id,
        'tokens.token' : token,
        'tokens.access' : 'auth'
    })
}

UserSchema.statics.findByCrendentials = function(email, password) {
    var Users = this
    return Users.findOne({email}).then(user => {
        if(!user){
            return Promise.reject()
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if(res){
                    resolve(user)
                }else {
                    reject(err)
                }
            })
        });
    })
}

UserSchema.pre('save', function (next) {
    var user = this

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})


var Users = mongoose.model('users', UserSchema)

module.exports = {Users}