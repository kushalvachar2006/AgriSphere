import { Router } from 'express';
import { listBuyers, matchBuyersHandler } from '../controllers/buyerController.js';
const router = Router();
router.get('/', listBuyers);
router.post('/match', matchBuyersHandler);
export default router;
