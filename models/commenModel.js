
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coin: {
    type: String,
    required: true
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;