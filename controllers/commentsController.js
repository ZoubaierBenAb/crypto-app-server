const asyncHandler = require("express-async-handler");
const Comment = require("../models/commenModel");
const mongoose = require("mongoose");

const addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;

  const coinId = req.params.coinId;

  if (!content) {
    res.status(400).json({ error: "Please enter a comment" });
    return;
  }

  const comment = await Comment.create({
    content,
    user: req.user,
    coin: coinId,
  });

  res.status(200).json({ message: "Comment added successfully" });
});

const getComments = asyncHandler(async (req, res) => {
  const { coinId } = req.params;

  const comments = await Comment.find({ coin: coinId }).populate(
    "user",
    "name"
  );

  if (comments.length === 0) {
    res.status(404).json({ message: "no comments found " });
  } else {
    const formattedComments = comments.map((comment) => ({
      id: comment._id,
      content: comment.content,
      user: comment.user.name,
    }));

    res.status(200).json({ comments: formattedComments });
  }
});

const deleteComment = asyncHandler(async () => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);

  if (!comment) {
    res.status(404);
    throw new Error("comment not found");
  }
  await comment.remove();
});
module.exports = {
  addComment,
  getComments,
  deleteComment,
};
