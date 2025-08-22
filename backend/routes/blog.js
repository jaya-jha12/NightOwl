import express from 'express';
import { createBlog,editBlog,deleteBlog,getBlog } from '../controllers/BlogController';



const router=express.Router();


export default router;