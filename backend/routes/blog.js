import express from 'express';
import { createBlog,editBlog,deleteBlog,getBlogs } from '../controllers/BlogController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router=express.Router();

router.post("/create",authenticate, createBlog);
router.get("/",authenticate, getBlogs);
router.put("/:id",authenticate, editBlog);
router.delete("/:id",authenticate, deleteBlog);

export default router;
