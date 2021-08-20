const {Schema, model} = require('mongoose')

const AdminSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email must be filled']
    },
    password: {
        type: String,
        required: [true, 'password must be filled']
    },
    username: {
        type: String,
        required: [true, 'username must be filled']
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