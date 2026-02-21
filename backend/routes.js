const { Router } = require("express");
const ProductController = require("./controllers/ProductController");
const SuppliersController = require("./controllers/SupplierController");
const routes = Router();
const multer = require("multer");
const path = require("path");

// Configuração das rotas para a tabela de Produtos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
routes.get("/products", ProductController.index);
routes.get("/products/:id", ProductController.show);
routes.delete("/products/:id", ProductController.destroy);
routes.post("/products", upload.single("image"), ProductController.store);
routes.put("/products/:id", upload.single("image"), ProductController.update);

// Configuração das rotas para a tabela de Fornecedores
routes.get("/supliers", SuppliersController.index);
routes.get("/supliers/:id", SuppliersController.show);

module.exports = routes;
