class WaterSupplyService {
  constructor() {
    this.database = require("../models/waterSupplyModel");
  }

  async getWaterSupply() {
    return this.database.getAll();
  }

  async addWaterSupply(date, supply) {
    if (!date || !supply) throw new Error("Invalid data provided");
    return this.database.add({ date, supply });
  }

  async updateWaterSupply(id, date, supply) {
    const record = this.database.getById(id);
    if (!record) throw new Error("Record not found");

    record.date = date || record.date;
    record.supply = supply || record.supply;
    return this.database.update(id, record);
  }

  async deleteWaterSupply(id) {
    return this.database.delete(id);
  }
}

module.exports = new WaterSupplyService(); // Singleton
