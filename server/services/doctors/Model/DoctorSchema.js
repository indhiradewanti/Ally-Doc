const {Schema, model} = require('mongoose')

const DoctorSchema = new Schema({
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
    photo: {
        type: String,
        required: [true, 'photo cannot be empty']
    },
    specialist: {
        type: String,
        required: [true, 'specialist cannot be empty']
    },
    address: {
        type: String,
        required: [true, 'address cannot be empty']
    },
    price: {
        type: Number,
        required: [true, 'price cannot be empty']
    },
    status: {
        type: String,
        default: 'Offline'
    },
    role:{
        type: String,
        default: 'Doctor'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Doctor', DoctorSchema)