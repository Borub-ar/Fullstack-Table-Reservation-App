import express from 'express';
import cors, { type CorsOptions } from 'cors';

import userRouter from './routes/users/users.router.js';
import { errorHandler } from './middleware/errorHandler.js';
import { appLimiter } from './middleware/rateLimit.js';

const app = express();

const whitelist = ['http://localhost:5173'];
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
app.use(appLimiter);

app.use('/users', userRouter);

app.use(errorHandler);

export default app;
