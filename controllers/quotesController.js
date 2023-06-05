const asyncHandler = require('express-async-handler')


const addQuote = asyncHandler(async(req,res)=>{
res.status(200).json({message:'user quotes'})
})

module.exports={
    addQuote
}