const express = require('express')
const app = express()
const port = process.env.PORT || 3003
const cors = require('cors')


app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.listen(port, () => console.log('running doctor in port', port))