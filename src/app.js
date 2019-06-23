const express = require('express');
const app = express();
const morgan = require('morgan');

const { userRoutes } = require('./routes');

app.use(express.json());
app.use(morgan('dev'));

// EndPoints
app.use('/api/v1/users', userRoutes);

// Errors
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.statusCode || 500).json({ message: error.message });
});

module.exports = app;
