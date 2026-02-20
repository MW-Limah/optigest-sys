const db = require("../database/database");

const ProductController = {
  // Listar todos os produtos
  async index(req, res) {
    db.all("SELECT * FROM products", [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },

  // Criar um novo produto
  async store(req, res) {
    const {
      name,
      cod_bar,
      description,
      quantity,
      category,
      expiration_date,
      image,
    } = req.body;
    const sql = `INSERT INTO products (name, cod_bar, description, quantity, category, expiration_date, image) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.run(
      sql,
      [name, cod_bar, description, quantity, category, expiration_date, image],
      function (err) {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({ id: this.lastID }); // 'this.lastID' retorna o ID gerado
      },
    );
  },

  // Buscar por ID
  async show(req, res) {
    const { id } = req.params;
    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row)
        return res.status(404).json({ message: "Produto não encontrado" });
      res.json(row);
    });
  },

  // Excluir um produto
  async destroy(req, res) {
    const { id } = req.params;
    const sql = "DELETE FROM products WHERE id = ?";

    db.run(sql, [id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // 'this.changes' indica quantas linhas foram afetadas
      if (this.changes === 0) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      res.json({ message: "Produto deletado com sucesso", id });
    });
  },
};

module.exports = ProductController;
