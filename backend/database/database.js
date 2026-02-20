const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

/* Criar tabela para produtos */

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cod_bar TEXT NOT NULL,
    description TEXT NOT NULL,
    quantity INTEGER,
    category TEXT NOT NULL,
    expiration_date DATE,
    image BLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);
});

module.exports = db;
