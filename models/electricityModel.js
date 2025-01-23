let electricityDatabase = [];

class ElectricityModel {
  getAll() {
    return electricityDatabase;
  }

  add(record) {
    const id = electricityDatabase[electricityDatabase.length - 1]?.id + 1 || 1;
    const newRecord = { id, ...record };
    electricityDatabase.push(newRecord);
    return newRecord;
  }

  getById(id) {
    return electricityDatabase.find((record) => record.id.toString() === id);
  }

  update(id, updatedRecord) {
    electricityDatabase = electricityDatabase.map((record) =>
      record.id.toString() === id ? updatedRecord : record
    );
    return updatedRecord;
  }

  delete(id) {
    electricityDatabase = electricityDatabase.filter(
      (record) => record.id.toString() !== id
    );
    return electricityDatabase;
  }
}

module.exports = new ElectricityModel(); // Singleton
