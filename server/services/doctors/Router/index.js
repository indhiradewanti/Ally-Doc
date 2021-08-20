const router = require('express').Router()
const doctorRouter = require('./Doctor')

router.use('/doctor', doctorRouter)


module.exports = router