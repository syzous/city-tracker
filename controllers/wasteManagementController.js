const express = require("express");
const router = express.Router();
const WasteManagementService = require("../services/wasteManagementService");

// POST new waste management data
router.post("/", async (req, res) => {
  const { date, wasteCollected } = req.body;
  try {
    const newWasteData = await WasteManagementService.addWasteData(
      date,
      wasteCollected
    );
    res.json({ message: "Waste management data added", data: newWasteData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT to update waste management data
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { date, wasteCollected } = req.body;
  try {
    const updatedData = await WasteManagementService.updateWasteData(
      id,
      date,
      wasteCollected
    );
    res.json({ message: "Waste management data updated", data: updatedData });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// DELETE waste management data
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const remainingData = await WasteManagementService.deleteWasteData(id);
    res.json({ message: "Waste management data deleted", data: remainingData });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
