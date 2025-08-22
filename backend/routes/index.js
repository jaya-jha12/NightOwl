import express from 'express';
import userRouter from '../routes/user';
import blogRouter from '../routes/blog';


const router=express.Router();

router.use('/blog',blogRouter);
router.use('/user',userRouter);

export default router;