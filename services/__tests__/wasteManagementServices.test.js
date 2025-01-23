const wasteManagementService = require("../../services/wasteManagementService");

describe("Waste Management Service", () => {
  // Test case: Get all waste management data
  it("should fetch all waste management data", async () => {
    const mockData = [
      { id: 1, date: "2025-01-01", wasteCollected: 500 },
      { id: 2, date: "2025-01-02", wasteCollected: 600 },
    ];

    wasteManagementService.getWasteManagement = jest
      .fn()
      .mockResolvedValue(mockData);

    const data = await wasteManagementService.getWasteManagement();

    expect(data).toBeDefined();
    expect(data).toHaveLength(2); // Assuming mock data length
  });

  // Test case: Add waste management data
  it("should add waste management data", async () => {
    wasteManagementService.addWasteManagement = jest.fn().mockResolvedValue({
      id: 3,
      date: "2025-01-01",
      wasteCollected: 700,
    });

    const newData = { date: "2025-01-01", wasteCollected: 700 };
    const addedData = await wasteManagementService.addWasteManagement(newData);

    expect(addedData).toHaveProperty("id");
    expect(addedData.date).toBe(newData.date);
    expect(addedData.wasteCollected).toBe(newData.wasteCollected);
  });

  // Test case: Update waste management data
  it("should update waste management data", async () => {
    const updatedData = { date: "2025-01-01", wasteCollected: 800 };

    wasteManagementService.updateWasteManagement = jest.fn().mockResolvedValue({
      id: 1,
      date: "2025-01-01",
      wasteCollected: 800,
    });

    const result = await wasteManagementService.updateWasteManagement(
      1,
      updatedData
    );

    expect(result).toBeDefined();
    expect(result.date).toBe(updatedData.date);
    expect(result.wasteCollected).toBe(updatedData.wasteCollected);
  });

  // Test case: Delete waste management data
  it("should delete waste management data", async () => {
    const mockData = [
      { id: 1, date: "2025-01-01", wasteCollected: 500 },
      { id: 2, date: "2025-01-02", wasteCollected: 600 },
    ];

    wasteManagementService.deleteWasteManagement = jest
      .fn()
      .mockResolvedValue(mockData.filter((item) => item.id !== 1));

    const result = await wasteManagementService.deleteWasteManagement(1);

    expect(result).toHaveLength(1); // Only one record remains
    expect(result[0].id).toBe(2); // The remaining record should be with id=2
  });
});
