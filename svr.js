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


// const http = require('http')
// const fs = require('fs')
// const port = 8080;

// const server = http.createServer(function(req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'})
//   fs.readFile('client', function(error, date) {
//     if (error) {
//       res.writeHead(404)
//       res.write('Error: File Not Found')
//     } else {
//       res.write(data)
//     }
//     res.end()
//   })
// })

// server.listen(port, function(error) {
//   if (error) {
//     console.log('Something went wrong', error)
//   } else {
//     console.log('Server is listening on port' + port)
//   }
// })

// Note to self: To start this, either write: node svr.js OR npm start in the terminal
// To stop, CTRL C
// In URL type  localhost:8080
