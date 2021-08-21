const router = require('express').Router()
const ControllerDoctor = require('../Controller/ControllerDoctor')
const upload = require('../helper/multer')

router.get('/', ControllerDoctor.getAllDoctor)
router.get('/:_id', ControllerDoctor.getIdDoctor)
router.post('/', upload.single("image"), ControllerDoctor.createDoctor)
router.post('/login', ControllerDoctor.loginDoctor)
router.put('/:_id', upload.single("image"), ControllerDoctor.updateDoctor)
router.patch('/status/:_id', ControllerDoctor.patchStatus)
router.patch('/photo/:_id', upload.single("image"), ControllerDoctor.patchPhoto)
router.delete('/:_id', ControllerDoctor.deleteDoctor)

module.exports = router