const db = require("../database/database");
const fs = require("fs"); // Importado para poder deletar arquivos físicos se necessário
const path = require("path");

const ProductController = {
  // Listar todos os produtos
  async index(req, res) {
    db.all("SELECT * FROM products", [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },

  // APIS

  // Criar um novo produto
  async store(req, res) {
    // Agora os dados de texto estão em req.body e o arquivo em req.file
    const { name, cod_bar, description, quantity, category, expiration_date } = req.body;

    // O Multer coloca as informações do arquivo aqui. Salvamos apenas o nome do arquivo no banco.
    const image = req.file ? req.file.filename : null;

    const sql = `INSERT INTO products (name, cod_bar, description, quantity, category, expiration_date, image) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.run(sql, [name, cod_bar, description, quantity, category, expiration_date, image], function (err) {
      if (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
          return res.status(400).json({
            message: "Produto com este código de barras já está cadastrado!",
          });
        }
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    });
  },

  // Buscar por ID
  async show(req, res) {
    const { id } = req.params;
    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ message: "Produto não encontrado" });
      res.json(row);
    });
  },

  // Excluir um produto
  async destroy(req, res) {
    const { id } = req.params;

    // Primeiro buscamos o produto para saber o nome da imagem e deletar o arquivo
    db.get("SELECT image FROM products WHERE id = ?", [id], (err, row) => {
      if (row && row.image) {
        const filePath = path.join(__dirname, "..", "uploads", row.image);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath); // Deleta a imagem da pasta uploads
      }

      const sql = "DELETE FROM products WHERE id = ?";
      db.run(sql, [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "Produto não encontrado" });
        res.json({ message: "Produto deletado com sucesso", id });
      });
    });
  },

  // Atualizar items
  async update(req, res) {
    const { id } = req.params;
    const { name, cod_bar, description, quantity, category, expiration_date, image: bodyImage } = req.body;
    let finalImage = req.file ? req.file.filename : bodyImage;

    const sql = `UPDATE products SET name=?, cod_bar=?, description=?, quantity=?, category=?, expiration_date=?, image=? WHERE id=?`;

    db.run(sql, [name, cod_bar, description, quantity, category, expiration_date, finalImage, id], function (err) {
      if (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
          return res.status(400).json({
            message: "Não foi possível atualizar. Este Código de barras já pertence a outro produto.",
          });
        }
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Produto atualizado com sucesso!" });
    });
  },
};

module.exports = ProductController;
