const mongoose = require('mongoose')

const userSchima = mongoose.Schema({
    name: {
        type: String,
        required: true,

        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    number: {
        type: Number,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
    },
    profilePic: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('user', userSchima)