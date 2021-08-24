require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors')
const router = require('./Router')
// const mongoose = require('./Config')
const errorHandling = require('./Middleware/errorHandling')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router)
app.use(errorHandling)

// app.listen(port, (_) => console.log('server listen in port', port))

module.exports = app