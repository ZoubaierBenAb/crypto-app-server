const express = require('express')
const {getCoinSentiment,update_createCoinSentiment,deleteSentiment,getUserSentiment} = require('../controllers/sentimentController')
const router = express.Router()
const {protect} = require('../middlewares/authMiddleware')


router.get('/:coinId',getCoinSentiment)
router.use(protect)
router.get('/:coinId/user',getUserSentiment)
router.post('/:coinId',update_createCoinSentiment)
router.delete('/:coinId',deleteSentiment)


module.exports = router