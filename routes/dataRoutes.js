const express = require('express')
const {getData} = require('../controllers/dataController')
const router = express.Router()

router.get('/',getData)
router.post('/',getData)


module.exports = router