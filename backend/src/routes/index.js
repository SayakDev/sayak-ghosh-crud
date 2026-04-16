import { Router } from 'express';
import userRoutes from './user.routes.js';
import rtiRoutes from './rti.routes.js';

const router = Router();

router.use('/users', userRoutes);
router.use('/rti', rtiRoutes);

export default router;
