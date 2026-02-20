const express = require("express");
const routes = require("./routes"); // Importa o arquivo routes.js acima
const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
