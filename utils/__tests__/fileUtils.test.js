const fileUtils = require("../fileUtils");

describe("fileUtils.parseCSV", () => {
  it("should correctly parse a CSV string", () => {
    const csvData = `date,consumption
2021-01-01,500
2021-01-02,450`;

    const parsedData = fileUtils.parseCSV(csvData);
    expect(parsedData).toEqual([
      { date: "2021-01-01", consumption: 500 },
      { date: "2021-01-02", consumption: 450 },
    ]);
  });

  it("should handle empty CSV data gracefully", () => {
    const csvData = ``;
    const parsedData = fileUtils.parseCSV(csvData);
    expect(parsedData).toEqual([]);
  });

  it("should handle CSV with extra spaces", () => {
    const csvData = `date,consumption
2021-01-01 , 500
2021-01-02, 450 `;
    const parsedData = fileUtils.parseCSV(csvData);
    expect(parsedData).toEqual([
      { date: "2021-01-01", consumption: 500 },
      { date: "2021-01-02", consumption: 450 },
    ]);
  });
});
