import { Router } from 'express';
import { createLot, getLot } from '../controllers/lotController.js';
const router = Router();
router.post('/', createLot);
router.get('/:id', getLot);
export default router;
