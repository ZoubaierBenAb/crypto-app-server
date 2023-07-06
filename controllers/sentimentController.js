const Coin = require('../models/coinModel')
const UserSentiment = require('../models/userSentiment')
const asyncHandler = require('express-async-handler')




const getUserSentiment = asyncHandler(async(req,res)=>{

const {coinId} = req.params

if (!coinId) {

res.status(404)
throw new Error('coin does not exist')

}

const userSentiment = UserSentiment.findOne({coin : coinId , user : req.user})

if (!userSentiment) {
res.status(404)
throw new Error('user sentiment not found') 
}


res.json(userSentiment.sentiment)



})



const getCoinSentiment =asyncHandler(async(req,res)=>{

    const {coinId} = req.params

    const coinExisted = await Coin.findOne({coin:coinId})


    if(!coinExisted){

res.status(404)
throw new Error('coin not found')
    }

const bearishCount = await UserSentiment.countDocuments({
    coin : coinExisted._id,
    sentiment : 'Bearish'
})

const bullishCount = await UserSentiment.countDocuments({
    coin : coinExisted._id,
    sentiment : 'Bullish'
})
const result = {
    bearish: bearishCount,
    bullish: bullishCount,
  };

  res.json(result);
});





    const update_createCoinSentiment = asyncHandler(async(req,res)=>{
const {sentiment} = req.body
const {coinId} = req.params

const coinExist = await Coin.findOne({coin : coinId})


if (!coinExist){
res.status(404)
throw new Error('coin not found')
}

const userSentimentExist = await UserSentiment.findOne({coin : coinExist._id,user : req.user})

if (userSentimentExist){
    userSentimentExist.sentiment = sentiment
    await userSentimentExist.save()

}

else {

const newUserSentiment =await UserSentiment.create({
sentiment,
user : req.user ,
coin : coinId
})
}

res.status(201).json({message : 'user sentiment setted or updated'})
    })


    const deleteSentiment = asyncHandler(async (req, res) => {
        const {coinId} = req.params;
      
        
        const sentiment = await UserSentiment.findOneAndDelete({ coin: coinId, user: req.user });
      
        if (!sentiment) {
          res.status(404);
          throw new Error('Sentiment not found');
        } else {
          res.json({ message: 'Sentiment deleted successfully' });
        }
      });
      
    module.exports = {getCoinSentiment,update_createCoinSentiment,deleteSentiment,getUserSentiment}