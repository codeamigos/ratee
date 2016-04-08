import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';

import config from './config';
import routes from './routes/index';
import user from './routes/user';
import quiz from './routes/quiz';
import feedback from './routes/feedback';


import './models';
mongoose.connect(config.mongodbUri);

const app = express();

const publicPath = path.join(process.cwd(), '.public');
app.use('/public', express.static(publicPath));

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(user);
app.use(quiz);
app.use(feedback);
app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

export default app;
