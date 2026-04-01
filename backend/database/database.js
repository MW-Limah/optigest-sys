const Database = require("better-sqlite3");
const path = require("path");
const db = new Database(path.join(__dirname, "..", "database.db"));

db.pragma("foreign_keys = ON");
db.pragma("journal_mode = WAL");

// --- Tabela de Produtos ---
try {
  db.exec(`ALTER TABLE products ADD COLUMN price REAL`);
} catch (err) {
  // Ignora se a coluna já existir
}

db.exec(`
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
  )
`);

// --- Tabela de Fornecedores ---
db.exec(`
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
  )
`);

// --- Tabela de Clientes (Nova) ---
db.exec(`
  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    phone_number TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// --- Tabela Intermediária ---
db.exec(`
  CREATE TABLE IF NOT EXISTS products_suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    supplier_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (product_id, supplier_id),
    FOREIGN KEY (product_id) REFERENCES products(id) 
      ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) 
      ON DELETE CASCADE ON UPDATE CASCADE
  )
`);

module.exports = db;
