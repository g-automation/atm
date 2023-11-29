import { Router } from 'express';
import { login, register } from '../controllers/authentication';

export default (router: Router) => {
  router.post('/register', register);
  router.post('/login', login);
};
