import { Router } from 'express';
import { userRouter } from '.';

const router = Router();

router.use('/users', userRouter);

export const apiRouter = router;
