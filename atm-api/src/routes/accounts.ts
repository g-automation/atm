import { Router } from 'express';
import { getAccounts, createAccount } from '../controllers/accounts';

const router = Router();

router.get('/', getAccounts);
router.post('/create', createAccount);

export default router;
