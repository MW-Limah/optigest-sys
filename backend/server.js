const express = require("express");
const routes = require("./routes"); // Importa o arquivo routes.js acima
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(routes);
app.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001");
});
