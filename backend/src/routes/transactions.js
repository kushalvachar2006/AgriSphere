import { Router } from 'express';
import { createTransaction, updateTransactionStatus, listTransactions } from '../controllers/transactionController.js';
const router = Router();
router.get('/', listTransactions);
router.post('/', createTransaction);
router.patch('/:id/status', updateTransactionStatus);
export default router;
