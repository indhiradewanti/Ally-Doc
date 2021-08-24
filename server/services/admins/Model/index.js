const {Schema, model} = require('mongoose')

const AdminSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email cannot be empty']
    },
    password: {
        type: String,
        required: [true, 'password cannot be empty']
    },
    username: {
        type: String,
        required: [true, 'username cannot be empty']
    },
    role:{
        type: String,
        default: 'Admin'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Admin', AdminSchema)