// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Storage configuration for file uploads
const upload = multer({
  dest: "uploads/",
});

// Mock database
const database = {
  waterSupply: [],
  electricity: [],
  wasteManagement: [],
};

// Endpoint to fetch data from an external integration (e.g., water supply data)
app.get("/api/water-supply", async (req, res) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/mock-water-supply"
    );
    database.waterSupply = response.data;
    res.json({
      message: "Water supply data updated from integration",
      data: database.waterSupply,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching water supply data",
      error: error.message,
    });
  }
});
app.get("/api/mock-water-supply", (req, res) => {
  res.json([
    { date: "2021-01-01", supply: 100 },
    { date: "2021-01-02", supply: 110 },
    { date: "2021-01-03", supply: 105 },
  ]);
});

app.post("/api/electricity", upload.single("file"), (req, res) => {
  const filePath = req.file.path;

  try {
    // Read the file
    const fileData = fs.readFileSync(filePath, "utf8");

    // Split the content into rows and skip the header
    const rows = fileData.split("\n").slice(1);

    rows.forEach((row) => {
      const columns = row.split(",");

      if (columns.length > 1) {
        database.electricity.push({
          date: columns[0].trim(),
          consumption: parseFloat(columns[1].trim()),
        });
      }
    });

    fs.unlinkSync(filePath); // Delete the file after processing
    res.json({
      message: "Electricity data uploaded and processed",
      data: database.electricity,
    });
  } catch (error) {
    console.error("Error processing the CSV file:", error);
    res.status(500).json({ message: "Error processing the CSV file" });
  }
});

app.get("/api/electricity/download-example-csv", (req, res) => {
  const filePath = "./files/electric_example.csv";
  const csv = fs.readFileSync(filePath, "utf8");

  res.send(csv);
});

// Endpoint to manually add waste management data
app.post("/api/waste-management", (req, res) => {
  const { date, wasteCollected } = req.body;
  if (!date || !wasteCollected) {
    return res.status(400).json({ message: "Invalid data provided" });
  }

  database.wasteManagement.push({
    date,
    wasteCollected,
  });

  res.json({
    message: "Waste management data added",
    data: database.wasteManagement,
  });
});

// Endpoint to fetch all data
app.get("/api/data", (req, res) => {
  res.json(database);
});

// Serve UI (HTML/JS frontend)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Automated test example using Singleton design pattern for database access
class Database {
  constructor() {
    if (!Database.instance) {
      Database.instance = this;
      this.data = database;
    }

    return Database.instance;
  }

  getData() {
    return this.data;
  }

  reset() {
    this.data = {
      waterSupply: [],
      electricity: [],
      wasteManagement: [],
    };
  }
}

const instance = new Database();
Object.freeze(instance);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Export the app (not the server)
module.exports = app;
