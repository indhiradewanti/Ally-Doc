require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3003
const cors = require('cors')
const mongoose = require('./Config')
const errorHandling = require('./Middleware/errorHandling')
const routes = require('./Router/index')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(routes)
app.use(errorHandling)

app.listen(port, () => console.log('running doctor in port', port))

module.exports = app