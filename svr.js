const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('client'));


app.get('*', function (request, response) {
  response.send('This is not the homepage');
});

app.listen(port, function () {
  console.log('Server is up at ', port);
});


// Note to self: To start this, either write: node svr.js OR npm start in the terminal
// To stop, CTRL C
// In URL type  localhost:8080
