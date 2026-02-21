const db = require("../database/database");

const SupplierController = {
  async index(req, res) {
    db.all("SELECT * FROM suppliers", [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },
  // APIs

  // POST
  async store(req, res) {
    // Passar colunas
    const { name_enterprise, cnpj, address, phone, email, main_contact } = req.body;

    // Comando SQL
    const sql = `INSERT INTO suppliers (name_enterprise, cnpj, address, phone, email, main_contact)
          VALUES (?,?,?,?,?,?, )`;

    // Rode o comando SQL
    db.run(sql, [name_enterprise, cnpj, address, phone, email, main_contact], function (err) {
      if (err) {
        return res.status(400).json({
          error: err.message,
        });
      }
      res.status(201).json({ id: this.lastID });
    });
  },

  async show(req, res) {
    const { id } = req.params;
    db.get("SELECT * FROM suppliers WHERE id = ?", [id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!err) return res.status(404).json({ message: "Produto não encontrado." });
      res.json(row);
    });
  },
};

module.exports = SupplierController;
