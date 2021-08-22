const router = require('express').Router()
const doctorRouter = require('./Doctor')
const historyRouter = require('./History')
const authenDoctor = require('../Middleware/authenthication')

router.use('/doctor', doctorRouter)
router.use(authenDoctor)
router.use('/history', historyRouter)

module.exports = router