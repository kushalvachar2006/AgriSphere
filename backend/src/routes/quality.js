import { Router } from 'express';
import { analyzeQuality } from '../controllers/qualityController.js';
const router = Router();
router.post('/analyze', analyzeQuality);
export default router;
