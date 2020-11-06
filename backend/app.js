const express = require('express');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/auth');
const apiRouter = require('./routers/api');

const app = express();

// Register middleware
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// register routes
app.use('/auth', authRouter);
app.use('/api', apiRouter);

module.exports = app;
