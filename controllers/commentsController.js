const asyncHandler = require("express-async-handler");
const Comment = require('../models/commentSchema')




const addComment = asyncHandler(async(req,res)=>{
    const {coin,user,content}=req.body
if (!content){
    res.status(400)
    throw new Error('please enter comment')

}

const comment =await Comment.create({
content,
user,
coin
})
res.status(200).json({message:'comment added successfully'})

})
const getComments = asyncHandler(async(req,res)=>{
const {coinId} = req.params

const comments = await Comment.find({coin : coinId})

if (comments.length === 0 ){
    res.status(404).json({message : 'no comments found '})
    
}
else {

    res.status(200).json({comments})
}
})
const deleteComment = ()=>{
    
}
module.exports = {
    addComment,
    getComments,
    deleteComment
}