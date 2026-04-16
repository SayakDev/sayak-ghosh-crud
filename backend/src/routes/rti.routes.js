import { Router } from 'express';
import upload from '../middlewares/upload.middleware.js';
import rtiController from '../controllers/rti.controller.js';

const router = Router();

const uploadFields = upload.fields([
  { name: 'applicationFile', maxCount: 1 },
  { name: 'attachmentFile', maxCount: 1 },
]);

router.get('/', rtiController.listRTIs);
router.get('/:id', rtiController.getRTIById);
router.put('/:id', uploadFields, rtiController.updateRTI);
router.delete('/:id', rtiController.deleteRTI);
router.post('/', uploadFields, rtiController.createRTI);

export default router;
