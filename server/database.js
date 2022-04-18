// import { sqlite } from 'sqlite'
// import { open } from 'sqlite';
import * as sqlite from 'sqlite';

async function init() {
  const db = await sqlite.open('./database.sqlite', { verbose: true });
  await db.migrate({ migrationsPath: './migrations-sqlite' });
  return db;
}

// const dbConn = init();

export async function listProducts() {
  const dbConn = init();
  const db = await dbConn;
  return db.all('SELECT * FROM products');
}

export async function findBrick(id) {
  const dbConn = init();
  const db = await dbConn;
  return db.get('SELECT * FROM products WHERE id = ?', id);
}
