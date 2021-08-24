const router = require('express').Router()
const ControllerAdmin = require('../Controller/ControllerAdmin')

router.post('/regis', ControllerAdmin.createAdmin)
router.post('/login', ControllerAdmin.loginAdmin)

module.exports = router