// Auth0
import authConfig from './auth-config.js';
import express from 'express';
// import { bricks } from './bricks.mjs';
import * as mb from './database.js';

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

/* List the products */
// async function getProducts(req, res) {
//   res.json(await mb.listProducts());
// }

// async function getOneProduct(req, res) {
//   res.json(await mb.findProduct(req.params.id));
// }

async function getProducts(req, res) {
  const result = await mb.listProducts();
  if (!result) {
    res.status(404).send('No match for that ID.');
    return;
  }
  res.json(result);
}

async function getOneProduct(req, res) {
  const result = await mb.findProduct(req.params.id);
  if (!result) {
    res.status(404).send('No match for that ID.');
    return;
  }
  res.json(result);
}


async function getOrderedItem(req, res) {
  const message = await mb.updateStock(req.body.id, req.body.inCart);
  res.json(message);
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

// To use bricks.mjs, comment DB stuff and uncomment normal global app.gets
