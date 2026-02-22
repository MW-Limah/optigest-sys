const db = require("../database/database");
const { update } = require("./ProductController");

const SupplierController = {
  // APIs
  // GET ALL
  async index(req, res) {
    db.all("SELECT * FROM suppliers", [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },

  // GET Especifico
  async show(req, res) {
    const { id } = req.params;
    db.get("SELECT * FROM suppliers WHERE id = ?", [id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ message: "Fornecedor não encontrado." });
      res.json(row);
    });
  },

  // POST
  async store(req, res) {
    // Passar colunas
    const { name_enterprise, cnpj, address, phone, email, main_contact } = req.body;

    // Comando SQL
    const sql = `INSERT INTO suppliers (name_enterprise, cnpj, address, phone, email, main_contact)
          VALUES (?,?,?,?,?,?)`;

    // Rode o comando SQL
    db.run(sql, [name_enterprise, cnpj, address, phone, email, main_contact], function (err) {
      if (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
          return res.status(400).json({
            message: "Fornecedor com este CNPJ já está cadastrado!",
          });
        }
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    });
  },

  // PUT
  async update(req, res) {
    const { id } = req.params;
    const { name_enterprise, cnpj, address, phone, email, main_contact } = req.body;

    const sql = `UPDATE suppliers SET name_enterprise=?, cnpj=?, address=?, phone=?, email=?, main_contact=? WHERE id=?`;

    db.run(sql, [name_enterprise, cnpj, address, phone, email, main_contact], function (err) {
      if (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
          return res.status(400).json({
            message: "Não foi possível atualizar. Este CNPJ já está cadastrado.",
          });
        }

        return res.status(500).json({
          error: err.message,
        });
      }

      res.status(201).json({ id: this.lastID });
    });
  },

  async destroy(req, res) {
    const { id } = req.params;

    const sql = "DELETE FROM suppliers WHERE id = ?";

    db.run(sql, [id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Nenhuma linha afetada → ID não existe
      if (this.changes === 0) {
        return res.status(404).json({
          message: "Fornecedor não encontrado.",
        });
      }

      res.json({
        message: "Fornecedor removido com sucesso!",
      });
    });
  },
};

module.exports = SupplierController;
