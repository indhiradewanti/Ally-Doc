const router = require('express').Router()
const doctorRouter = require('./Doctor')
const historyRouter = require('./History')

router.use('/doctor', doctorRouter)
router.use('/history', historyRouter)

module.exports = router