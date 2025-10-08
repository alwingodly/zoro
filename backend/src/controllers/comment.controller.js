import asyncHandler from "express-async-handler";
import Comment from "../models/comment.model";
import { getAuth } from "@clerk/express";
import User from "../models/user.model";
import Post from "../models/post.model";
import Notification from "../models/notification.model";

export const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: postId })
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilePicture");
  if (!comments) {
    res.status(404).json({ message: "No comments found" });
    return;
  }
  res.status(200).json({ comments });
});

export const createComment = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.params;
  const { content } = req.body;

  if (!content || content.trim() === "") {
    res.status(400).json({ message: "Content is required" });
    return;
  }

  const user = await User.findById({ clerkId: userId });
  const post = await Post.findById(postId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  const comment = await Comment.create({
    content,
    user: user._id,
    post: post._id,
  });

  await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

  if (post.user.toString() !== user._id.toString()) {
    await Notification.create({
      from: user._id,
      to: post.user,
      type: "comment",
      post: postId,
      comment: comment.id,
    });
  }

  res.status(201).json({ comment });
});

export const deleteComment = asyncHandler(async (req, res) => {
        const { userId } = getAuth(req);
        const { commentId } = req.params;
      
        const user = await User.findOne({ clerkId: userId });
        const comment = await Comment.findById(commentId);
      
         if(!comment) return res.status(404).json({ error: "comment not found" });
         if(!user) return res.status(404).json({ error: "User not found" });
      
         if(post.user.toString() !== user._id.toString()){
            return res.status(401).json({ error: "You can only delete your own poat" });
         }
         await Comment.deleteMany({ posts: postId});
         await Post.findByIdAndDelete(postId);
    
         res.status(200).json({ message: "Post deleted successfully" });
});
