import express from 'express';
import { createBlog,editBlog,deleteBlog,getBlog } from '../controllers/BlogController';

const router=express.Router();

router.post("/", createBlog);
router.get("/", getBlog);
router.put("/:id", editBlog);
router.delete("/:id", deleteBlog);

export default router;