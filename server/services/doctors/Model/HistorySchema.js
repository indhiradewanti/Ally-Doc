const {Schema, model} = require('mongoose')

const HistorySchema = new Schema({
    userName: {
        type: String,
        required: [true, 'userName cannot be empty']
    },
    userId: {
        type: String,
        required: [true, 'userId cannot be empty']
    },
    userGender: {
        type: String,
        required: [true, 'userGender cannot be empty']
    },
    userPhoto: {
        type: String,
        required: [true, 'userPhoto cannot be empty']
    },
    doctorId: {
        type: String,
        required: [true, 'doctorId cannot be empty']
    },
    doctorName: {
        type: String,
        required: [true, 'doctorName cannot be empty']
    },
    doctorPhoto: {
        type: String,
        required: [true, 'doctorPhoto cannot be empty']
    },
    doctorSpecialist: {
        type: String,
        required: [true, 'doctorSpecialist cannot be empty']
    },
    status: {
        type: String,
        required: [true, 'status cannot be empty']
    }
})

module.exports = model('History', HistorySchema)