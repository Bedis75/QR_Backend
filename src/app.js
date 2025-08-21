const express = require("express");
const cors = require("cors");

const documentRoutes = require("./routes/document.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/documents", documentRoutes);

module.exports = app;
