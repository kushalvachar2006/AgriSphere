import { Router } from 'express';
import { getDemoFarmer, listFarmers, matchFarmersForBuyer } from '../controllers/farmerController.js';
const router = Router();
router.get('/demo', getDemoFarmer);
router.get('/', listFarmers);
router.post('/match', matchFarmersForBuyer);
export default router;