const {Schema, model} = require('mongoose')

const HistorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'name cannot be empty']
    },
    age: {
        type: Number,
        required: [true, 'age cannot be empty']
    },
    gender: {
        type: String,
        required: [true, 'gender cannot be empty']
    },
    status: {
        type: String,
        required: [true, 'status cannot be empty']
    }
})

module.exports = model('History', HistorySchema)