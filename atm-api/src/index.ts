import 'dotenv/config';

import express from 'express';
import mongoose, { Error } from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import statusRoutes from './routes/status';
import accountsRoutes from './routes/accounts';
import atmRoutes from './routes/atm';

const app = express();
const uri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/cluster0';

mongoose
  .connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch((error: Error) => console.log(error));

app.use(cors());

app.use(bodyParser.json());

app.use('/api', statusRoutes);

app.use('/accounts', accountsRoutes);
app.use('/atm', atmRoutes);

const PORT = process.env.PORT ?? 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
