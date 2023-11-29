import { Router } from 'express';

import {
  getAllCustomers,
  deleteCustomer,
  updateCustomer,
} from '../controllers/customers';
import { isAuthenticated } from '../middlewares/customers';

export default (router: Router) => {
  router.get('/', getAllCustomers);
  router.delete('/delete/:id', isAuthenticated, deleteCustomer);
  router.patch('/:id', isAuthenticated, updateCustomer);
};
