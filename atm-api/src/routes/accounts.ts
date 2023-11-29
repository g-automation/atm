import { Router } from 'express';
import {
  getAccounts,
  createAccount,
  deleteAccount,
  deleteAllAccounts,
} from '../controllers/accounts';

const router = Router();

router.get('/', getAccounts);
router.post('/create', createAccount);
router.delete('/delete', deleteAccount);
router.delete('/delete/all', deleteAllAccounts);

export default router;
