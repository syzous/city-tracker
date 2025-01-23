class WasteManagementService {
  constructor() {
    this.database = require("../models/wasteManagementModel");
  }

  async addWasteData(date, wasteCollected) {
    if (!date || !wasteCollected) throw new Error("Invalid data provided");
    return this.database.add({ date, wasteCollected });
  }

  async updateWasteData(id, date, wasteCollected) {
    const record = this.database.getById(id);
    if (!record) throw new Error("Record not found");

    record.date = date || record.date;
    record.wasteCollected = wasteCollected || record.wasteCollected;
    return this.database.update(id, record);
  }

  async deleteWasteData(id) {
    return this.database.delete(id);
  }
}

module.exports = new WasteManagementService(); // Singleton
