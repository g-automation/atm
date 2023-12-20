import { Router } from 'express';

import {
  getCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customers';
//import { isAuthenticated } from '../middlewares/customers';

const router = Router();

router.get('/', getAllCustomers);
router.get('/:email', getCustomer);
router.patch('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;