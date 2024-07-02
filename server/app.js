/**
 * Title: app.js
 * Author: Professor Krasso
 * Editor: Cody Skelton
 * Date: 07.02.2024
 */
'use strict'

// Require statements
const express = require('express')
const createServer = require('http-errors')
const path = require('path')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const userRoute = require('./routes/user-routes');
const port = process.env.PORT || 4000;

// Create the Express app
const app = express()

// Configure the app
app.use(express.json())
app.set('port', process.env.PORT || 3000);
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../dist/bcrs')))
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')))
app.listen(port, () => {
  console.log(`BCRS listening on port ${port}`)
})

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BCRS APIs',
      version: '0.1.0',
    },
  },
  apis: ['./server/routes/*.js'],
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use("/api/users", userRoute);

// error handler for 404 errors
app.use(function(req, res, next) {
  next(createServer(404)) // forward to error handler
})

// error handler for all other errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500) // set response status code

  // send response to client in JSON format with a message and stack trace
  res.json({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  })
})

module.exports = app // export the Express application