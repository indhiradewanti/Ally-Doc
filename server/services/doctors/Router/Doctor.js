const router = require('express').Router()

router.get('/')
router.get('/:_id')
router.post('/')
router.put('/:_id')
router.delete('/:_id')

module.exports = router