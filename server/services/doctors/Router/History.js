const router = require('express').Router()
const ControllerHistory = require('../Controller/ControllerHistory')
const authenDoctor = require('../Middleware/authenthication')

router.post('/', ControllerHistory.postHistory)
router.use(authenDoctor)
router.get('/', ControllerHistory.getHistory)
router.patch('/:_id', ControllerHistory.patchStatusHistory)

module.exports = router