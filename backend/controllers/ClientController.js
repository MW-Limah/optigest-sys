const db = require("../database/database");

const ClienteController = {
  // Listar todos os clientes
  index(req, res) {
    try {
      const rows = db.prepare("SELECT * FROM clients ORDER BY name ASC").all();
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Mostrar um cliente específico
  show(req, res) {
    try {
      const { id } = req.params;
      const row = db.prepare("SELECT * FROM clients WHERE id = ?").get(id);
      if (!row) return res.status(404).json({ message: "Cliente não encontrado" });
      res.json(row);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Criar novo cliente
  store(req, res) {
    try {
      const { name, cpf, phone_number, email, address } = req.body;

      const sql = `INSERT INTO clients 
      (name, cpf, phone_number, email, address) 
      VALUES (?, ?, ?, ?, ?)`;

      const result = db.prepare(sql).run(name, cpf, phone_number, email, address);

      res.status(201).json({ id: result.lastInsertRowid });
    } catch (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        let field = err.message.split(": ")[1];
        return res.status(400).json({
          message: `Já existe um cliente cadastrado com este ${field.includes("cpf") ? "CPF" : "Telefone"}.`,
        });
      }
      res.status(400).json({ error: err.message });
    }
  },

  // Atualizar cliente
  update(req, res) {
    try {
      const { id } = req.params;
      const { name, cpf, phone_number, email, address } = req.body;

      const sql = `UPDATE clients SET 
      name=?, cpf=?, phone_number=?, email=?, address=?, updated_at=CURRENT_TIMESTAMP
      WHERE id=?`;

      const result = db.prepare(sql).run(name, cpf, phone_number, email, address, id);

      if (result.changes === 0) return res.status(404).json({ message: "Cliente não encontrado" });

      res.json({ message: "Cliente atualizado com sucesso!" });
    } catch (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(400).json({
          message: "Não foi possível atualizar. CPF ou Telefone já pertencem a outro cliente.",
        });
      }
      res.status(500).json({ error: err.message });
    }
  },

  // Deletar cliente
  destroy(req, res) {
    try {
      const { id } = req.params;

      const result = db.prepare("DELETE FROM clients WHERE id = ?").run(id);

      if (result.changes === 0) return res.status(404).json({ message: "Cliente não encontrado" });

      res.json({ message: "Cliente deletado com sucesso", id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = ClienteController;
