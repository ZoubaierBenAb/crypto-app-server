const mongoose = require('mongoose')


const commentSchema = mongoose.Schema({
    content : {
        type : String,
        required : true
    },
  user : {type : mongoose.Schema.Types.ObjectId,ref : 'User' , required : true }  ,
  coin :{type : mongoose.Schema.Types.ObjectId,ref : 'Coin', required : true}
})

const Comment = mongoose.model('comment' ,commentSchema)

module.exports = Comment