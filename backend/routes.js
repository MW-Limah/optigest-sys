const { Router } = require("express");
const ProductController = require("./controllers/ProductController");
const routes = Router();

// Define as rotas chamando as funções do Controller
routes.get("/products", ProductController.index);
routes.get("/products/:id", ProductController.show);
routes.post("/products", ProductController.store);

routes.delete("/products/:id", ProductController.destroy);

module.exports = routes;
