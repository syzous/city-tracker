let waterSupplyDatabase = [
  { id: 1, date: "2021-01-01", supply: 100 },
  { id: 2, date: "2021-01-02", supply: 200 },
  { id: 3, date: "2021-01-03", supply: 300 },
];

class WaterSupplyModel {
  getAll() {
    return waterSupplyDatabase;
  }

  add(record) {
    const id = waterSupplyDatabase[waterSupplyDatabase.length - 1]?.id + 1 || 1;
    const newRecord = { id, ...record };
    waterSupplyDatabase.push(newRecord);
    return newRecord;
  }

  getById(id) {
    return waterSupplyDatabase.find((record) => record.id.toString() === id);
  }

  update(id, updatedRecord) {
    waterSupplyDatabase = waterSupplyDatabase.map((record) =>
      record.id.toString() === id ? updatedRecord : record
    );
    return updatedRecord;
  }

  delete(id) {
    waterSupplyDatabase = waterSupplyDatabase.filter(
      (record) => record.id.toString() !== id
    );
    return waterSupplyDatabase;
  }
}

module.exports = new WaterSupplyModel(); // Singleton
