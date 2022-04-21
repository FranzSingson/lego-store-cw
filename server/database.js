/*

// import { sqlite } from 'sqlite'
// import { open } from 'sqlite';
import * as sqlite from 'sqlite';

// const sqlite3 = require('sqlite3');
// const sqlite = require('sqlite');
// import sqlite from 'sqlite';

async function init() {
  const db = await sqlite.open('./database.sqlite', { verbose: true });
  await db.migrate({ migrationsPath: './databaseInit' });
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

*/

import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// this is a top-level await 
(async () => {
  // open the database
  const db = await open({
    filename: '/tmp/database.db',
    driver: sqlite3.Database
  })
})()

await db.exec('CREATE TABLE tbl (col TEXT)')
await db.exec('INSERT INTO tbl VALUES ("test")')

const result = await db.get('SELECT col FROM tbl WHERE col = ?', 'test')
// { col: 'test' }