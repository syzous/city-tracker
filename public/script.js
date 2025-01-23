document.addEventListener("DOMContentLoaded", () => {
  // Fetch Water Supply Data
  const fetchWaterDataButton = document.getElementById("fetch-water-data");
  const waterDataList = document.getElementById("water-data-list");
  const waterForm = document.getElementById("add-water-data-form");

  const addRowWaterData = (item) => {
    const row = document.createElement("li");

    // Inputs for editing
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = item.date;

    const supplyInput = document.createElement("input");
    supplyInput.type = "number";
    supplyInput.value = item.supply;

    // Update Button
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.addEventListener("click", async () => {
      try {
        await fetch(`/api/water-supply/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: dateInput.value,
            supply: supplyInput.value,
          }),
        });
      } catch (error) {
        console.error("Error updating water supply data:", error);
      }
    });

    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
      try {
        const response = await fetch(`/api/water-supply/${item.id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          waterDataList.removeChild(row);
        }
      } catch (error) {
        console.error("Error deleting water supply data:", error);
      }
    });

    row.appendChild(dateInput);
    row.appendChild(supplyInput);
    row.appendChild(updateButton);
    row.appendChild(deleteButton);
    waterDataList.appendChild(row);
  };

  const fetchWaterData = async () => {
    try {
      const response = await fetch("/api/water-supply");
      const result = await response.json();

      if (response.ok) {
        waterDataList.innerHTML = "";
        result.data.forEach((item) => {
          addRowWaterData(item);
        });
      }
    } catch (error) {
      console.error("Error fetching water supply data:", error);
    }
  };

  fetchWaterData();
  fetchWaterDataButton.addEventListener("click", fetchWaterData);

  waterForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(waterForm);

    const waterData = {
      date: formData.get("date"),
      supply: formData.get("waterCollected"),
    };
    const response = await fetch("/api/water-supply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(waterData),
    });

    if (response.ok) {
      waterForm.reset();
      const data = await response.json();
      const item = data.data;
      addRowWaterData(item);

      console.log("Water data added successfully");
    } else {
      console.error("Error adding water supply data:");
    }
    try {
    } catch (error) {
      console.error("Error adding water supply data:", error);
    }
  });

  // Upload Electricity Data
  const electricityForm = document.getElementById("upload-electricity-form");
  const electricityDataList = document.getElementById("electricity-data-list");
  const electricDownloadExampleCSV = document.getElementById(
    "electricity-download-example-csv"
  );

  // Download Electricity CSV Programmatically
  const downloadElectricityCSV = () => {
    // Make an API call to get the CSV file
    fetch("/api/electricity/download-example-csv") // Assuming your server provides the CSV file at this endpoint
      .then((response) => response.text())
      .then((csvData) => {
        // Create a Blob from the CSV data
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.download = "electricity_data.csv"; // Filename for the download
        document.body.appendChild(link); // Append the link to the document
        link.click(); // Programmatically click the link
        document.body.removeChild(link); // Clean up by removing the link
        URL.revokeObjectURL(url); // Revoke the blob URL to free memory
      })
      .catch((error) => console.error("Error fetching CSV:", error));
  };

  // Trigger the download when the button is clicked
  const downloadButton = document.getElementById(
    "electricity-download-example-csv"
  );
  downloadButton.addEventListener("click", downloadElectricityCSV);

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
          const row = document.createElement("li");
          const dateInput = document.createElement("input");
          dateInput.type = "date";
          dateInput.value = item.date;

          const consumptionInput = document.createElement("input");
          consumptionInput.type = "number";
          consumptionInput.value = item.consumption;

          const updateButton = document.createElement("button");
          updateButton.textContent = "Update";
          updateButton.addEventListener("click", async () => {
            try {
              await fetch(`/api/electricity/${item.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  date: dateInput.value,
                  consumption: consumptionInput.value,
                }),
              });
            } catch (error) {
              console.error("Error updating electricity data:", error);
            }
          });

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", async () => {
            try {
              const response = await fetch(`/api/electricity/${item.id}`, {
                method: "DELETE",
              });
              if (response.ok) {
                electricityDataList.removeChild(row);
              }
            } catch (error) {
              console.error("Error deleting electricity data:", error);
            }
          });

          row.appendChild(dateInput);
          row.appendChild(consumptionInput);
          row.appendChild(updateButton);
          row.appendChild(deleteButton);
          electricityDataList.appendChild(row);
        });
      }
    } catch (error) {
      console.error("Error uploading electricity data:", error);
    }
  });

  // Add and Manage Waste Management Data
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
      const { id } = data.data;
      if (response.ok) {
        // Clear form
        wasteForm.reset();
        // Add to list
        const row = document.createElement("li");
        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.value = wasteData.date;

        const amountInput = document.createElement("input");
        amountInput.type = "number";
        amountInput.value = wasteData.wasteCollected;

        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.addEventListener("click", async () => {
          try {
            await fetch(`/api/waste-management/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                date: dateInput.value,
                wasteCollected: amountInput.value,
              }),
            });
            console.log("Waste data updated successfully");
          } catch (error) {
            console.error("Error updating waste management data:", error);
          }
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", async () => {
          try {
            const response = await fetch(`/api/waste-management/${id}`, {
              method: "DELETE",
            });
            if (response.ok) {
              wasteDataList.removeChild(row);
            }
          } catch (error) {
            console.error("Error deleting waste management data:", error);
          }
        });

        row.appendChild(dateInput);
        row.appendChild(amountInput);
        row.appendChild(updateButton);
        row.appendChild(deleteButton);
        wasteDataList.appendChild(row);
      }
    } catch (error) {
      console.error("Error adding waste management data:", error);
    }
  });
});
