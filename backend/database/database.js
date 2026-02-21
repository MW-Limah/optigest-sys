const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

/* Criar tabela para produtos */

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cod_bar TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    quantity INTEGER,
    category TEXT NOT NULL,
    expiration_date DATE,
    image BLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_enterprise TEXT NOT NULL,
    cnpj TEXT UNIQUE NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    main_contact TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
});

module.exports = db;
