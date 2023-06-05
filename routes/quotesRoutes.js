const express = require('express')
const {addQuote}= require('../controllers/quotesController')
const router = express.Router()


router.get('/quotes',addQuote)


module.exports = router