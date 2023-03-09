require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const databaseConnect = require('./utils/databaseConnect');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');

//  initialize app
const app = express();

//  port defines
const port = process.env.PORT || 5001;

// cors config
const corsConfig = {
  origin: true,
  credentials: true,
};

//  middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
app.disable('x-powered-by'); // less hackers know about our stack

// database connect
databaseConnect();

// displaying default response
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome here!',
  });
});

// setting-up application routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// listening to the port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// if express fail to handle any error for that there's global errorHandler
process.on('unhandledRejection', (err) => {
  console.log(err.name);
  console.log(err.message);
  app.close(() => {
    process.exit(1);
  });
});
