require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const next = require("next");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const productRoutes = require("./src/routes/products");
const userRoutes = require("./src/routes/users");
const uploadRoutes = require("./src/routes/upload");

const connectDB = require("./src/config/database");
connectDB();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(express.static("public"));
    server.use(cors());

    server.use("/api/products", productRoutes);
    server.use("/api/users", userRoutes);
    server.use("/api/upload", uploadRoutes);

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(process.env.PORT || 3001, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3001");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
