const express = require('express')
const router = express.Router()
const {protect} = require('../middlewares/authMiddleware')

const {addComment,getComments,deleteComment} = require('../controllers/commentsController')

router.get('/:coinId/comments',getComments)


router.use(protect)
router.post('/:coinId/comments',addComment)

router.delete('/comments/:commentId',deleteComment)

module.exports = router