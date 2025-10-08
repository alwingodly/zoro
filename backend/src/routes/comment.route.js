import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/",  getComments)

router.post("/post/:postId", protectRoute, createComment)
router.delete("/:commentId", protectRoute, deleteComment)


export default router;
