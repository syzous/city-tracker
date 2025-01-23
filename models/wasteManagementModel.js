let wasteManagementDatabase = [];

class WasteManagementModel {
  getAll() {
    return wasteManagementDatabase;
  }

  add(record) {
    const id =
      wasteManagementDatabase[wasteManagementDatabase.length - 1]?.id + 1 || 1;
    const newRecord = { id, ...record };
    wasteManagementDatabase.push(newRecord);
    return newRecord;
  }

  getById(id) {
    return wasteManagementDatabase.find(
      (record) => record.id.toString() === id
    );
  }

  update(id, updatedRecord) {
    wasteManagementDatabase = wasteManagementDatabase.map((record) =>
      record.id.toString() === id ? updatedRecord : record
    );
    return updatedRecord;
  }

  delete(id) {
    wasteManagementDatabase = wasteManagementDatabase.filter(
      (record) => record.id.toString() !== id
    );
    return wasteManagementDatabase;
  }
}

module.exports = new WasteManagementModel(); // Singleton
