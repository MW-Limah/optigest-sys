const { Router } = require("express");
const ProductController = require("./controllers/ProductController");
const SuppliersController = require("./controllers/SupplierController");
const ProductsSuppliersController = require("./controllers/ProductsSuppliersController");

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

// ----------- PRODUCTS ↔ SUPPLIERS ----------
routes.post("/products-suppliers", ProductsSuppliersController.link);
routes.delete("/products-suppliers/:product_id/:supplier_id", ProductsSuppliersController.unlink);

routes.get("/products-suppliers", ProductsSuppliersController.index);
routes.get("/products/:product_id/suppliers", ProductsSuppliersController.suppliersByProduct);
routes.get("/suppliers/:supplier_id/products", ProductsSuppliersController.productsBySupplier);

// ⭐ ESSENCIAL para sua tela
routes.get("/products-with-suppliers", ProductsSuppliersController.indexWithSuppliers);

module.exports = routes;
