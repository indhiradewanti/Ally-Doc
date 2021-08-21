const router = require('express').Router()
const ControllerDoctor = require('../Controller/ControllerDoctor')

router.get('/', ControllerDoctor.getAllDoctor)
router.get('/:_id', ControllerDoctor.getIdDoctor)
router.post('/', ControllerDoctor.createDoctor)
router.post('/login', ControllerDoctor.loginDoctor)
router.put('/:_id', ControllerDoctor.updateDoctor)
router.patch('/status/:_id', ControllerDoctor.patchStatus)
router.patch('/photo/:_id', ControllerDoctor.patchPhoto)
router.delete('/:_id', ControllerDoctor.deleteDoctor)

module.exports = router