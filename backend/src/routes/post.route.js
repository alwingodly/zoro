import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createPost, getPost, getPosts, getUserPosts, likePost } from "../controllers/post.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/",  getPosts)
router.get("/:postId" , getPost)
router.get("/user/:username" , getUserPosts)

router.post("/create", protectRoute,upload.single("image"), createPost)
router.put("/:postId/like", protectRoute, likePost)
// router.delete("/delete/:postId", protectRoute, deletePost)


export default router;
