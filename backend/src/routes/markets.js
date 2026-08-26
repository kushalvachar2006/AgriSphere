import { Router } from 'express';
import { listMarkets, getMarketTrends } from '../controllers/marketController.js';
const router = Router();
router.get('/trends', getMarketTrends);
router.get('/', listMarkets);
export default router;
