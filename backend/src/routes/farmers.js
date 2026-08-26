import { Router } from 'express';
import { getDemoFarmer } from '../controllers/farmerController.js';
const router = Router();
router.get('/demo', getDemoFarmer);
export default router;
