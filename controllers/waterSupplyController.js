const express = require("express");
const router = express.Router();
const WaterSupplyService = require("../services/waterSupplyService");

// GET water supply data
router.get("/", async (req, res) => {
  try {
    const data = await WaterSupplyService.getWaterSupply();
    res.json({ message: "Water supply data fetched", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new water supply data
router.post("/", async (req, res) => {
  const { date, supply } = req.body;
  try {
    const newWaterSupply = await WaterSupplyService.addWaterSupply(
      date,
      supply
    );
    res.json({ message: "Water supply data added", data: newWaterSupply });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT to update water supply data
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { date, supply } = req.body;
  try {
    const updatedData = await WaterSupplyService.updateWaterSupply(
      id,
      date,
      supply
    );
    res.json({ message: "Water supply data updated", data: updatedData });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// DELETE water supply data
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const remainingData = await WaterSupplyService.deleteWaterSupply(id);
    res.json({ message: "Water supply data deleted", data: remainingData });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
