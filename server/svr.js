// Auth0
import authConfig from './auth-config.js';
import express from 'express';
// import { bricks } from './bricks.mjs';
import * as dataB from './database.js';

const app = express();
const port = 8080;

app.get('/auth-config', (req, res) => {
  res.json(authConfig);
});

app.use(express.static('client'));

/* This is test data when using brick.mjs */
// app.get('/bricks', (req, res) => {
//   res.json(bricks);
// });

async function getProducts(req, res) {
  const result = await dataB.listProducts();
  if (!result) {
    res.status(404).send('No match for that ID.');
    return;
  }
  res.json(result);
}

async function getOneProduct(req, res) {
  const result = await dataB.findProduct(req.params.id);
  if (!result) {
    res.status(404).send('No match for that ID.');
    return;
  }
  res.json(result);
}

async function getOrderedItem(req, res) {
  const data = await dataB.updateStock(req.body.id, req.body.inCart);
  res.json(data);
}

// From Stage simple board stage8
function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.get('/bricks', asyncWrap(getProducts));
app.get('/bricks/:id', asyncWrap(getOneProduct));
app.put('/bricks/bought/:id', express.json(), asyncWrap(getOrderedItem));


app.get('*', function (request, response) {
  response.status(404).send('Error 404: Not Found');
});

app.listen(port, function () {
  console.log('Server is up at ', port);
});


// Note to self: To start this with "npm start" in the terminal
// To stop, CTRL C
// In URL type  localhost:8080
