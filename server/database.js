import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
// import { updateDbStock } from '../client/js/paymentHandler.js';

// you would have to import / invoke this in another file
async function openDb() {
  const database = await open({
    filename: './server/stock.db',
    verbose: true,
    driver: sqlite3.Database,
  });
  await database.migrate({ migrationsPath: './server/migrations-sqlite' });
  return database;
}

// async function init() {
//   const db = await sqlite.open('./database.sqlite', { verbose: true });
//   await db.migrate({ migrationsPath: './migrations-sqlite' });
//   return db;
// }

// Delete the create and insert functions.

const dbOpen = openDb();

async function deleteTable() {
  const db = await dbOpen;
  await db.exec('DROP TABLE products');
}

export async function listProducts() {
  const db = await dbOpen;
  return db.all('SELECT * FROM products');
}

export async function findProduct(id) {
  const db = await dbOpen;
  return db.all('SELECT * FROM products WHERE id = ?', id);
}

export async function updateStock(id, bought) {
  const db = await dbOpen;
  const stockLevel = (await db.get('SELECT stock FROM products WHERE id = ?', id)).stock;
  const newStockNum = stockLevel - bought;
  console.log(newStockNum);
  return db.run('UPDATE products SET stock = ? WHERE id = ?', newStockNum, id);
}

// updateDbStock();

// async function editProducts(id, value) {
//   const db = await dbOpen;
//   return db.run("UPDATE products SET stock = ? WHERE id = ?", value, id)
// }


// findProduct(0);
// updateStock(0, 40)
// editProducts(0, 50)
// editProducts(1, 50)
// createTable();
// insertProducts();
// deleteTable();
