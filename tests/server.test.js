const request = require("supertest");
const app = require("../server"); // Assuming your express app is in 'server.js'
const fs = require("fs");
const path = require("path");

// Test suite for the Express app
describe("Express API", () => {
  // Test for GET /api/water-supply
  it("should fetch water supply data", async () => {
    const res = await request(app).get("/api/water-supply");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Water supply data updated from integration");
    expect(res.body.data).toEqual([
      { date: "2021-01-01", supply: 100 },
      { date: "2021-01-02", supply: 110 },
      { date: "2021-01-03", supply: 105 },
    ]);
  });

  // Test for POST /api/electricity
  it("should upload and process electricity data from CSV file", async () => {
    const filePath = path.join(__dirname, "../files/electric_example.csv");
    const formData = {
      file: fs.createReadStream(filePath),
    };

    const res = await request(app)
      .post("/api/electricity")
      .attach("file", filePath); // Upload the CSV file

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Electricity data uploaded and processed");
    expect(res.body.data).toEqual([
      { date: "2025-01-01", consumption: 450 },
      { date: "2025-01-02", consumption: 500 },
      { date: "2025-01-03", consumption: 480 },
    ]);
  });

  // Test for POST /api/waste-management
  it("should add waste management data", async () => {
    const wasteData = {
      date: "2021-01-01",
      wasteCollected: 500,
    };

    const res = await request(app)
      .post("/api/waste-management")
      .send(wasteData);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Waste management data added");
    expect(res.body.data).toEqual([
      { date: "2021-01-01", wasteCollected: 500 },
    ]);
  });

  // Test for GET /api/data
  it("should return all data", async () => {
    const res = await request(app).get("/api/data");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("waterSupply");
    expect(res.body).toHaveProperty("electricity");
    expect(res.body).toHaveProperty("wasteManagement");
  });

  // Test for GET /api/electricity/download-example-csv
  it("should return example CSV data", async () => {
    const res = await request(app).get("/api/electricity/download-example-csv");

    expect(res.status).toBe(200);
    expect(res.text).toContain("Date,Consumption (kWh)"); // Checking if the CSV has headers
  });
});
