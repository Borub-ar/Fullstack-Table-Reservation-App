import express from 'express';
import cors, { type CorsOptions } from 'cors';
import userRouter from './routes/users/users.router.js';

const app = express();

const whitelist = ['http://localhost'];
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin ?? '') !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/users', userRouter);

export default app;
