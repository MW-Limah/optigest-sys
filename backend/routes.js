const { Router } = require("express");
const ProductController = require("./controllers/ProductController");
const routes = Router();
const multer = require("multer");
const path = require("path");

// Configuração do Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // CORRIGIDO: Era 'cd', o correto é 'cb'
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// CORRIGIDO: Agora usamos o 'storage' configurado acima
const upload = multer({ storage: storage });

// Rotas de busca e deleção (sem alteração)
routes.get("/products", ProductController.index);
routes.get("/products/:id", ProductController.show);
routes.delete("/products/:id", ProductController.destroy);

// CORRIGIDO: Mantenha APENAS as versões com upload.single
// Remova as linhas antigas que não tinham o middleware do multer
routes.post("/products", upload.single("image"), ProductController.store);
routes.put("/products/:id", upload.single("image"), ProductController.update);

module.exports = routes;
