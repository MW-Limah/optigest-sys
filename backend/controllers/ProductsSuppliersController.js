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
          return res.status(409).json({ error: "This supplier is already linked to this product" });
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
};

module.exports = ProductsSuppliersController;
