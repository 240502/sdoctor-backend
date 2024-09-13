import { Router } from 'express';
import statusRouter from './statusRouter';
const router = Router();
router.use('/status', statusRouter);
export default router;
