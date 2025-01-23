const fs = require("fs");
const fileUtils = require("../utils/fileUtils");
const ElectricityModel = require("../models/electricityModel");

class ElectricityService {
  constructor() {
    this.database = ElectricityModel;
  }

  async processElectricityFile(filePath) {
    const fileData = fs.readFileSync(filePath, "utf8");
    const rows = fileUtils.parseCSV(fileData);

    rows.forEach((row) => {
      const { date, consumption } = row;
      this.database.add({ date, consumption });
    });
    fs.unlinkSync(filePath); // Clean up file after processing
    return this.database.getAll();
  }

  async updateElectricity(id, date, consumption) {
    const record = this.database.getById(id);
    if (!record) throw new Error("Electricity data not found");

    record.date = date || record.date;
    record.consumption = consumption || record.consumption;
    return this.database.update(id, record);
  }

  async deleteElectricity(id) {
    return this.database.delete(id);
  }
}

module.exports = new ElectricityService(); // Singleton
