const {Schema, model} = require('mongoose')

const DoctorUserSchema = new Schema({
    _idDoctor: {
        type: String,
        required: [true, '_idDoctor cannot be empty']
    },
    _idUser: {
        type: String,
        required: [true, '_idUser cannot be empty']
    }
})

module.exports = model('DoctorUser', DoctorUserSchema)