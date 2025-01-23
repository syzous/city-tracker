const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const waterSupplyController = require("./controllers/waterSupplyController");
const electricityController = require("./controllers/electricityController");
const wasteManagementController = require("./controllers/wasteManagementController");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Route definitions
app.use("/api/water-supply", waterSupplyController);
app.use("/api/electricity", electricityController);
app.use("/api/waste-management", wasteManagementController);

// Serve UI
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
