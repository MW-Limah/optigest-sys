const { Router } = require("express");
const ProductController = require("./controllers/ProductController");
const SuppliersController = require("./controllers/SupplierController");
const ProductsSuppliersController = require("./controllers/ProductsSuppliersController");
const ClienteController = require("./controllers/ClientController"); // Importe o novo controller

const routes = Router();
const multer = require("multer");
const path = require("path");

// 📦 Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// ---------------- PRODUCTS ----------------
routes.get("/products", ProductController.index);
routes.get("/products/:id", ProductController.show);
routes.post("/products", upload.single("image"), ProductController.store);
routes.put("/products/:id", upload.single("image"), ProductController.update);
routes.delete("/products/:id", ProductController.destroy);

// ---------------- SUPPLIERS ----------------
routes.get("/suppliers", SuppliersController.index);
routes.get("/suppliers/:id", SuppliersController.show);
routes.post("/suppliers", SuppliersController.store);
routes.put("/suppliers/:id", SuppliersController.update);
routes.delete("/suppliers/:id", SuppliersController.destroy);

// ---------------- CLIENTES ----------------
routes.get("/clients", ClienteController.index);
routes.get("/clients/:id", ClienteController.show);
routes.post("/clients", ClienteController.store);
routes.put("/clients/:id", ClienteController.update);
routes.delete("/clients/:id", ClienteController.destroy);

// ----------- PRODUCTS ↔ SUPPLIERS ----------
routes.post("/products-suppliers", ProductsSuppliersController.link);
routes.delete("/products-suppliers/:product_id/:supplier_id", ProductsSuppliersController.unlink);

routes.get("/products-suppliers", ProductsSuppliersController.index);
routes.get("/products/:product_id/suppliers", ProductsSuppliersController.suppliersByProduct);
routes.get("/suppliers/:supplier_id/products", ProductsSuppliersController.productsBySupplier);

// ⭐ ESSENCIAL para a tela de Associações
routes.get("/products-with-suppliers", ProductsSuppliersController.indexWithSuppliers);

module.exports = routes;
