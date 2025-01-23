const waterSupplyService = require("../../services/waterSupplyService");

describe("Water Supply Service", () => {
  // Test case: Get all water supply data
  it("should fetch all water supply data", async () => {
    const mockData = [
      { id: 1, date: "2025-01-01", supply: 700 },
      { id: 2, date: "2025-01-02", supply: 800 },
    ];

    waterSupplyService.getWaterSupply = jest.fn().mockResolvedValue(mockData);

    const data = await waterSupplyService.getWaterSupply();

    expect(data).toBeDefined();
    expect(data).toHaveLength(2); // Assuming mock data length
  });

  // Test case: Add water supply data
  it("should add water supply data", async () => {
    waterSupplyService.addWaterSupply = jest.fn().mockResolvedValue({
      id: 3,
      date: "2025-01-01",
      supply: 700,
    });
    const newData = { date: "2025-01-01", supply: 700 };
    const addedData = await waterSupplyService.addWaterSupply(newData);

    expect(addedData).toHaveProperty("id");
    expect(addedData.date).toBe(newData.date);
    expect(addedData.supply).toBe(newData.supply);
  });
});
