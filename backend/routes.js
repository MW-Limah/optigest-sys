const { Router } = require("express");
const ProductController = require("./controllers/ProductController");
const routes = Router();

// Configuração para salvar uma imagem real
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  // Salvar na pasta uploads
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  // nome = data + nome original // Adicionar funções regex no frontend para normalizar
  filename: (req, file, cb) => {
    cd(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Define as rotas chamando as funções do Controller
routes.get("/products", ProductController.index);
routes.get("/products/:id", ProductController.show);
routes.post("/products", ProductController.store);
routes.delete("/products/:id", ProductController.destroy);
routes.put("/products/:id", ProductController.update);

// post e put de imagens
routes.post("/products", upload.single("image"), ProductController.store);
routes.post("/products/:id", upload.single("image"), ProductController.update);

module.exports = routes;
