import express from 'express';
import userRouter from '../routes/user.js';
import blogRouter from '../routes/blog.js';


const router=express.Router();

router.use('/blog',blogRouter);
router.use('/user',userRouter);

export default router;