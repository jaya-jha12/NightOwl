import express from 'express';
import { createBlog,editBlog,deleteBlog,getBlogs,getBlogById } from '../controllers/BlogController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router=express.Router();

router.post("/create",authenticate, createBlog);
router.get("/",authenticate, getBlogs);
router.get("/:id",authenticate,getBlogById)
router.put("/:id",authenticate, editBlog);
router.delete("/:id",authenticate, deleteBlog);

export default router;
