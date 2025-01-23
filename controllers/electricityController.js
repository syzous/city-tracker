const express = require("express");
const multer = require("multer");
const electricityService = require("../services/electricityService");
const fileUtils = require("../utils/fileUtils");
const router = express.Router();
const fs = require("fs");

// Middleware for parsing JSON data
router.use(express.json()); // Parse application/json
router.use(express.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded

// Middleware for file upload handling
const upload = multer({ dest: "uploads/" });

// POST electricity data via file upload
router.post("/", upload.single("file"), async (req, res) => {
  const filePath = req.file?.path; // Check if file exists
  if (!filePath) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  try {
    const result = await electricityService.processElectricityFile(filePath); // Process parsed data
    res.json({ message: "Electricity data uploaded", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT to update electricity data
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { date, consumption } = req.body;

  if (!date || consumption === undefined) {
    return res.status(400).json({ message: "Invalid data provided" });
  }

  try {
    const updatedData = await electricityService.updateElectricity(
      id,
      date,
      consumption
    );
    res.json({ message: "Electricity data updated", data: updatedData });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// DELETE electricity data
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const remainingData = await electricityService.deleteElectricity(id);
    res.json({ message: "Electricity data deleted", data: remainingData });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/download-example-csv", (req, res) => {
  const filePath = "uploads/electric_example.csv";
  const csv = fs.readFileSync(filePath, "utf8");

  res.send(csv);
});

module.exports = router;
