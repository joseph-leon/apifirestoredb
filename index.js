"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const usersRoutes = require("./routes/users-routes");
const productsRoutes = require("./routes/products-routes");
const authRoutes = require("./routes/auth-routes");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", usersRoutes.routes);
app.use("/api", productsRoutes.routes);
app.use("/api", authRoutes.routes);

app.listen(config.port, () =>
  console.log(
    "La aplicación está escuchando en la url http://localhost:" + config.port
  )
);
