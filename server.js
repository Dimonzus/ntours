// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config({ path: './config.env' });

// const DB = process.env.DATABASE;

// mongoose.connect(DB).then(() => {
//   // console.log(con.connections);
//   console.log('DB connection successful');
// });

// const app = require('./app');

// //console.log(process.env);

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   // eslint-disable-next-line no-console
//   console.log(`App running on port ${port}...`);
// });

const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE;
const app = require('./app');

mongoose.connect(DB).then(() => {
  // console.log(con.connections);
  console.log('DB connection successful');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
