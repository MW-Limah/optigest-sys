const db = require("../database/database");

const ProductsSuppliersController = {
  // 🔗 Criar vínculo produto ↔ fornecedor
  link(req, res) {
    const { product_id, supplier_id } = req.body;

    if (!product_id || !supplier_id) {
      return res.status(400).json({ error: "product_id and supplier_id are required" });
    }

    const sql = `
      INSERT INTO products_suppliers (product_id, supplier_id)
      VALUES (?, ?)
    `;

    db.run(sql, [product_id, supplier_id], function (err) {
      if (err) {
        if (err.message.includes("UNIQUE")) {
          return res.status(409).json({ error: "Esse fornecedor já está associado a esse produto." });
        }
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        message: "Link created successfully",
        id: this.lastID,
      });
    });
  },

  // ❌ Remover vínculo
  unlink(req, res) {
    const { product_id, supplier_id } = req.params;

    const sql = `
      DELETE FROM products_suppliers
      WHERE product_id = ? AND supplier_id = ?
    `;

    db.run(sql, [product_id, supplier_id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Link not found" });
      }

      res.json({ message: "Link removed successfully" });
    });
  },

  // 📋 Listar todos os vínculos
  index(req, res) {
    const sql = `
      SELECT 
        ps.id,
        p.name AS product,
        s.name_enterprise AS supplier
      FROM products_suppliers ps
      JOIN products p ON p.id = ps.product_id
      JOIN suppliers s ON s.id = ps.supplier_id
    `;

    db.all(sql, [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },

  // 🏭 Listar fornecedores de um produto
  suppliersByProduct(req, res) {
    const { product_id } = req.params;

    const sql = `
      SELECT s.*
      FROM products_suppliers ps
      JOIN suppliers s ON s.id = ps.supplier_id
      WHERE ps.product_id = ?
    `;

    db.all(sql, [product_id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },

  // 📦 Listar produtos de um fornecedor
  productsBySupplier(req, res) {
    const { supplier_id } = req.params;

    const sql = `
      SELECT p.*
      FROM products_suppliers ps
      JOIN products p ON p.id = ps.product_id
      WHERE ps.supplier_id = ?
    `;

    db.all(sql, [supplier_id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },

  // GET /products-with-suppliers
  indexWithSuppliers(req, res) {
    const sql = `
    SELECT 
      p.id,
      p.name,
      p.cod_bar,
      p.description,
      p.image,
      s.id AS supplier_id,
      s.name_enterprise,
      s.cnpj
      FROM products p
      LEFT JOIN products_suppliers ps ON ps.product_id = p.id
      LEFT JOIN suppliers s ON s.id = ps.supplier_id
    ORDER BY p.name;`;

    db.all(sql, [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });

      // Agrupar produtos
      const productsMap = {};

      rows.forEach((row) => {
        if (!productsMap[row.id]) {
          productsMap[row.id] = {
            id: row.id,
            name: row.name,
            cod_bar: row.cod_bar,
            description: row.description,
            image: row.image,
            suppliers: [],
          };
        }

        if (row.supplier_id) {
          productsMap[row.id].suppliers.push({
            id: row.supplier_id,
            name: row.name_enterprise,
            cnpj: row.cnpj,
          });
        }
      });

      res.json(Object.values(productsMap));
    });
  },
};

module.exports = ProductsSuppliersController;
