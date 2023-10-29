import { Router } from 'express';
import { withdraw } from '../controllers/atm';

const router = Router();

router.put('/withdraw', withdraw);

export default router;
