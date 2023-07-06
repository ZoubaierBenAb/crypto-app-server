const express = require('express')
const {addCoinToWichlist,deleteCoinFromWishlist,getUserWishlist} = require('../controllers/wishlistController')
const router = express.Router()



router.get('/',getUserWishlist)
router.post('/',addCoinToWichlist)
router.delete('/:coinId',deleteCoinFromWishlist)


module.exports = router