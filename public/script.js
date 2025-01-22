document.addEventListener("DOMContentLoaded", () => {
  // Fetch Water Supply Data
  const fetchWaterDataButton = document.getElementById("fetch-water-data");
  const waterDataList = document.getElementById("water-data-list");

  fetchWaterDataButton.addEventListener("click", async () => {
    try {
      const response = await fetch("/api/water-supply");
      const result = await response.json();

      if (response.ok) {
        waterDataList.innerHTML = "";
        result.data.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = `Date: ${item.date}, Supply: ${item.supply}`;
          waterDataList.appendChild(li);
        });
      } else {
        alert(data.message || "Failed to fetch water supply data");
      }
    } catch (error) {
      console.error("Error fetching water supply data:", error);
    }
  });

  // Upload Electricity Data
  const electricDownloadExampleCSV = document.getElementById(
    "electricity-download-example-csv"
  );
  const electricityForm = document.getElementById("upload-electricity-form");
  const electricityDataList = document.getElementById("electricity-data-list");

  electricDownloadExampleCSV.addEventListener("click", async () => {
    try {
      const response = await fetch("/api/electricity/download-example-csv");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "electricity-example.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error downloading example CSV:", error);
    }
  });
  electricityForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(electricityForm);

    try {
      const response = await fetch("/api/electricity", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        electricityDataList.innerHTML = "";
        data.data.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = `Date: ${item.date}, Consumption: ${item.consumption}`;
          electricityDataList.appendChild(li);
        });
      } else {
        alert(data.message || "Failed to upload electricity data");
      }
    } catch (error) {
      console.error("Error uploading electricity data:", error);
    }
  });

  // Add Waste Management Data
  const wasteForm = document.getElementById("add-waste-data-form");
  const wasteDataList = document.getElementById("waste-data-list");

  wasteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(wasteForm);
    const wasteData = {
      date: formData.get("date"),
      wasteCollected: formData.get("wasteCollected"),
    };

    try {
      const response = await fetch("/api/waste-management", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wasteData),
      });
      const data = await response.json();

      if (response.ok) {
        wasteDataList.innerHTML = "";
        data.data.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = `Date: ${item.date}, Waste Collected: ${item.wasteCollected} kg`;
          wasteDataList.appendChild(li);
        });
      } else {
        alert(data.message || "Failed to add waste management data");
      }
    } catch (error) {
      console.error("Error adding waste management data:", error);
    }
  });
});
