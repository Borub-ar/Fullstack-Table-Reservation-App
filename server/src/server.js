const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

const PORT = process.env.PORT || 8000;
const MONGO_URL =
  'mongodb+srv://Table-Reservation-API:FeDiFAVDBVoRFCqk@cluster0.oehttvl.mongodb.net/?appName=TableReservation';

const server = http.createServer(app);

mongoose.connection.once('open', () => console.log('Mongoose connected successfully'));
mongoose.connection.on('error', err => onsole.error(`Mongoose connection error: ${err}`));

const startServer = async () => {
  await mongoose.connect(MONGO_URL);

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
