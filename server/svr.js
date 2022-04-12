// Auth0
import authConfig from './auth-config.js';
import express from 'express';
import { bricks } from './bricks.mjs';
import path from 'path';
import url from 'url';


// const express = require('express');
const app = express();
const port = 8080;


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
