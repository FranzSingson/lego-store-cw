import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
// import { updateDbStock } from '../client/js/paymentHandler.js';

// you would have to import / invoke this in another file
async function openDb() {
  return await open({
    filename: './server/stock.db',
    driver: sqlite3.Database,
  });
}

const dbOpen = openDb();

async function deleteTable() {
  const db = await dbOpen;
  await db.exec('DROP TABLE products')
}

export async function listProducts() {
  const db = await dbOpen;
  return db.all('SELECT * FROM products');
}

async function createTable() {
  const db = await dbOpen;
  await db.exec('CREATE TABLE products ( id INT PRIMARY KEY, name TEXT NOT NULL, price INT NOT NULL, imgSrc TEXT NOT NULL, type TEXT NOT NULL, colour TEXT NOT NULL, inCart INT NOT NULL, stock INT NOT NULL)')
}

async function insertProducts() {
  const db = await dbOpen;
  await db.run("INSERT INTO products (id, name, price, imgSrc, type, colour, inCart, stock) VALUES (0, 'Item0', 0.50, './images/brick0.jpg', 'brick', 'White', 0, 50), (1, 'Item1', 0.50, './images/brick1.jpg', 'brick', 'Brown', 0, 50), (2, 'Item2', 0.50, './images/brick2.jpg', 'brick', 'Blue - Azure', 0, 50), (3, 'Item3', 0.50, './images/brick3.jpg', 'brick', 'Brown - Yellow', 0, 50), (4, 'Item4', 0.50, './images/brick4.jpg', 'brick', 'Yellow - Bright', 0, 50), (5, 'Item5', 0.50, './images/brick5.jpg', 'brick', 'Blue - Bright', 0, 50), (6, 'Item6', 0.50, './images/brick6.jpg', 'brick', 'Red - Dark', 0, 50), (7, 'Item7', 0.50, './images/brick7.jpg', 'brick', 'Blue - Medium', 0, 50), (8, 'Item8', 0.50, './images/brick8.jpg', 'brick', 'Green - Sand', 0, 50), (9, 'Item9', 0.50, './images/brick9.jpg', 'brick', 'Brown - Medium', 0, 50), (10, 'Item10', 50, './images/set10.jpg', 'set', 'Multi', 0, 50), (11, 'Item11', 50, './images/set11.jpg', 'set', 'Multi', 0, 50), (12, 'Item12', 50, './images/set12.jpg', 'set', 'Multi', 0, 50), (13, 'Item13', 50, './images/set13.jpg', 'set', 'Multi', 0, 50)")
}

async function updateStock(id, bought) {
  const db = await dbOpen;
  const stockLevel = (await db.get('SELECT stock FROM products WHERE id = ?', id)).stock;
  const newStockNum = stockLevel - bought;
  console.log(newStockNum)
  return db.run("UPDATE products SET stock = ? WHERE id = ?", newStockNum, id)
}

// updateDbStock();

// async function editProducts(id, value) {
//   const db = await dbOpen;
//   return db.run("UPDATE products SET stock = ? WHERE id = ?", value, id)
// }



// updateStock(0, 40)
// editProducts(0, 50)
// editProducts(1, 50)
// createTable();
// insertProducts();
// deleteTable();