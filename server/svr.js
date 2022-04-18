// Auth0
import authConfig from './auth-config.js';
import express from 'express';
import { bricks } from './bricks.mjs';

// import * as mb from './database.js';


// const express = require('express');

const app = express();
const port = 8080;

// Database stuff underneath

// async function getProducts(req, res) {
//   res.json(await mb.listProducts());
// }

// async function getProduct(req, res) {
//   const result = await mb.findBrick(req.params.id);
//   if (!result) {
//     res.status(404).send('Match for ID not found');
//     return;
//   }
//   res.json(result);
// }

// function asyncWrap(f) {
//   return (req, res, next) => {
//     Promise.resolve(f(req, res, next))
//       .catch((e) => next(e || new Error()));
//   };
// }

// app.get('/bricksdb', asyncWrap(getProducts));
// app.get('/bricks/;id', asyncWrap(getProduct));

// Database stuff above

app.get('/auth-config', (req, res) => {
  res.json(authConfig);
});

app.get('/bricks', (req, res) => {
  res.json(bricks);
});

app.use(express.static('client'));

app.get('*', function (request, response) {
  response.status(404).send('Error 404: Not Found');
});

app.listen(port, function () {
  console.log('Server is up at ', port);
});


// Note to self: To start this with "npm start" in the terminal
// To stop, CTRL C
// In URL type  localhost:8080
