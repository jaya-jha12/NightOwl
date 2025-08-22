import express from 'express';
import { createBlog,editBlog,deleteBlog,getBlogs } from '../controllers/BlogController';
import { authenticate } from '../middleware/authMiddleware';

const router=express.Router();

router.post("/",authenticate, createBlog);
router.get("/",authenticate, getBlogs);
router.put("/:id",authenticate, editBlog);
router.delete("/:id",authenticate, deleteBlog);

export default router;