const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/users/users.router');

const app = express();

const whitelist = ['http://localhost'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/users', userRouter);

module.exports = app;
