// Auth0
import authConfig from './auth-config.js';
import express from 'express';
import path from 'path';
import url from 'url';


// const express = require('express');
const app = express();
const port = 8080;


app.get('/auth-config', (req, res) => {
  res.json(authConfig);
});

app.use(express.static('client'));


app.get('*', function (request, response) {
  response.send('This is not the homepage');
});

app.listen(port, function () {
  console.log('Server is up at ', port);
});



// Note to self: To start this with "npm start" in the terminal
// To stop, CTRL C
// In URL type  localhost:8080
