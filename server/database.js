import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDb() {
  const database = await open({
    filename: './server/stock.db',
    verbose: true,
    driver: sqlite3.Database,
  });
  await database.migrate({ migrationsPath: './server/migrations-sqlite' });
  return database;
}

// Delete the create and insert functions.

const dbOpen = openDb();

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
