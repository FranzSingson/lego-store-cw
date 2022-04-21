// Auth0
import authConfig from './auth-config.js';
import express from 'express';
import { bricks } from './bricks.mjs';

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// import * as mb from './database.js';


const app = express();
const port = 8080;

app.get('/auth-config', (req, res) => {
  res.json(authConfig);
});


// Database stuff underneath

/*
async function getProducts(req, res) {
  res.json(await mb.listProducts());
}

async function getProduct(req, res) {
  const result = await mb.findBrick(req.params.id);
  if (!result) {
    res.status(404).send('Match for ID not found');
    return;
  }
  res.json(result);
}

function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.get('/bricksdb', asyncWrap(getProducts));
app.get('/bricks/;id', asyncWrap(getProduct));
*/
// Database stuff above


// (async () => {
//   // open the database
//   const db = await open({
//     filename: './server/stock.db',
//     driver: sqlite3.Database,
//   });

//   /* Creates table */
//   // await db.exec('CREATE TABLE products ( id INT PRIMARY KEY, name TEXT NOT NULL, price INT NOT NULL, imgSrc TEXT NOT NULL, type TEXT NOT NULL, colour TEXT NOT NULL, inCart INT NOT NULL)')

//   /* To insert products */
//   // await db.run("INSERT INTO products (id, name, price, imgSrc, type, colour, inCart) VALUES (0, 'Item0', 0.50, './images/brick0.jpg', 'brick', 'White', 0), (1, 'Item1', 0.50, './images/brick1.jpg', 'brick', 'Brown', 0), (2, 'Item2', 0.50, './images/brick2.jpg', 'brick', 'Blue - Azure', 0), (3, 'Item3', 0.50, './images/brick3.jpg', 'brick', 'Brown - Yellow', 0), (4, 'Item4', 0.50, './images/brick4.jpg', 'brick', 'Yellow - Bright', 0), (5, 'Item5', 0.50, './images/brick5.jpg', 'brick', 'Blue - Bright', 0), (6, 'Item6', 0.50, './images/brick6.jpg', 'brick', 'Red - Dark', 0), (7, 'Item7', 0.50, './images/brick7.jpg', 'brick', 'Blue - Medium', 0), (8, 'Item8', 0.50, './images/brick8.jpg', 'brick', 'Green - Sand', 0), (9, 'Item9', 0.50, './images/brick9.jpg', 'brick', 'Brown - Medium', 0), (10, 'Item10', 50, './images/set10.jpg', 'set', 'Multi', 0), (11, 'Item11', 50, './images/set11.jpg', 'set', 'Multi', 0), (12, 'Item12', 50, './images/set12.jpg', 'set', 'Multi', 0), (13, 'Item13', 50, './images/set13.jpg', 'set', 'Multi', 0) ")

//   const result = await db.all('SELECT * FROM products');
//   // await db.run("UPDATE products SET inCart = 0 WHERE id = 0")
//   app.get('/bricks', (req, res) => {
//     res.json(result);
//   });
//   console.log(result);

//   /* To drop the table */
//   // await db.exec('DROP TABLE products')


//   app.use(express.static('client'));

//   app.get('*', function (request, response) {
//     response.status(404).send('Error 404: Not Found');
//   });

//   app.listen(port, function () {
//     console.log('Server is up at ', port);
//   });

// })();




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

// To use bricks.mjs, comment DB stuff and uncomment normal global app.gets
