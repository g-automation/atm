import { Router } from 'express';

const router = Router();

router.post('/status', (req, res) =>
  res.status(200).json({
    message: 'OK!',
  }),
);

export default router;
