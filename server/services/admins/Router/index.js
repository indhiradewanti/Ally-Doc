const router = require('express').Router()
const Admin = require('./Admin')

router.use("/admin", Admin)

module.exports = router