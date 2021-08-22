const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true, dbName: 'AllyDoc'}, () => {
    console.log('connect to db')
})

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('succesfully connected')
})

module.exports = mongoose