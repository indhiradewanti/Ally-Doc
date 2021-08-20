const {Schema, model} = require('mongoose')

const AdminSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
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