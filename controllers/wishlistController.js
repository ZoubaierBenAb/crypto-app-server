const asyncHandler = require("express-async-handler");
const Wishlist = require('../models/wishlistModel')





const getUserWishlist = asyncHandler(async(req,res)=>{

    const userWishlist = await Wishlist.find({user : req.user})

    if (!userWishlist) {
        res.status(402).json({ error: 'Wishlist not found' });
        return;
      }
    

      const coinArray = userWishlist.map((item) => item.coin);

      res.status(200).json({ wishlist: coinArray });


})

const addCoinToWichlist = asyncHandler(async(req,res)=>{

const {coin} = req.body

const coinExist = await Wishlist.findOne({coin , user : req.user})

if (coinExist){
    res.status(400)
    throw new Error('Coin already exist in your wishlist')
}

const wishlistItem = await Wishlist.create({
    user : req.user,
    coin 
})


res.status(201).json({wishlistItem : coin})
})

const deleteCoinFromWishlist = asyncHandler(async(req,res)=>{
  const {coinId} = req.params

  const wishlistItem = await Wishlist.findOne({ user: req.user, coin: coinId });
  if (!wishlistItem) {
    throw new Error('Wishlist item not found');
  }

  await wishlistItem.deleteOne();

  res.status(200).json({ message: 'Wishlist item removed' });
});


  module.exports = {getUserWishlist,deleteCoinFromWishlist,addCoinToWichlist}




