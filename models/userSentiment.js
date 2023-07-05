const mongoose = require('mongoose')



const sentimentSchema = mongoose.Schema({
sentiment : {
    type : String,
    enum : ['Bullish','Bearish']
},
coin : {
 type : String,
 required : true 
},
user : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'User'
}
})

const UserSentiment = mongoose.model('UserSentiment',sentimentSchema)


module.exports = UserSentiment