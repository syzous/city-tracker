const ElectricityService = require("../electricityService");
const fs = require("fs");

// Mock database
const database = {
  electricity: [
    { id: 1, date: "2021-01-01", consumption: 500 },
    { id: 2, date: "2021-01-02", consumption: 450 },
  ],
};

jest.mock("../electricityService"); // Mock the electricityService

describe("ElectricityService", () => {
  it("should process electricity data correctly", async () => {
    const mockFileData = [
      { date: "2021-01-01", consumption: 500 },
      { date: "2021-01-02", consumption: 450 },
    ];

    ElectricityService.processElectricityFile = jest
      .fn()
      .mockResolvedValue(mockFileData);

    const result = await ElectricityService.processElectricityFile(
      mockFileData
    );

    expect(result).toEqual(mockFileData);
    expect(ElectricityService.processElectricityFile).toHaveBeenCalledTimes(1);
  });

  it("should update electricity data correctly", async () => {
    const updatedData = { id: 1, date: "2021-01-03", consumption: 600 };
    ElectricityService.updateElectricity = jest
      .fn()
      .mockResolvedValue(updatedData);

    const result = await ElectricityService.updateElectricity(
      1,
      "2021-01-03",
      600
    );

    expect(result).toEqual(updatedData);
    expect(ElectricityService.updateElectricity).toHaveBeenCalledTimes(1);
  });

  it("should delete electricity data correctly", async () => {
    const updatedDatabase = [{ id: 2, date: "2021-01-02", consumption: 450 }];
    ElectricityService.deleteElectricity = jest
      .fn()
      .mockResolvedValue(updatedDatabase);

    const result = await ElectricityService.deleteElectricity(1);

    expect(result).toEqual(updatedDatabase);
    expect(ElectricityService.deleteElectricity).toHaveBeenCalledTimes(1);
  });
});
