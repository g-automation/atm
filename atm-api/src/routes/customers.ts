import { Router } from 'express';

import {
  getAllCustomers,
  deleteCustomer,
  updateCustomer,
} from '../controllers/customers';
import { isAuthenticated, isOwner } from '../middlewares/customers';

export default (router: Router) => {
  router.get('/customers', getAllCustomers);
  router.delete('/customers/:id', isAuthenticated, deleteCustomer);
  router.patch('/customers/:id', isAuthenticated, updateCustomer);
};
