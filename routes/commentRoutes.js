const express = require('express')
const router = express.Router()

const {addComment,getComments,deleteComment} = require('../controllers/commentsController')


router.post('/:coinId/comments',addComment)
router.get('/:coinId/comments',getComments)
router.delete('/comments/:commentId',deleteComment)

module.exports = router