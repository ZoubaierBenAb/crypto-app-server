const mongoose = require('mongoose')

const coinCategorySchema = mongoose.Schema({

name : {
    type : String,
    required : true
},
content : {
    type : String ,
},
market_cap : {
    type : String
}


})

const CoinCategory = mongoose.model('CoinCategory',coinCategorySchema)

module.exports = CoinCategory