module.exports = {
  parseCSV: (data) => {
    const rows = data.split("\n").slice(1);
    return rows.map((row) => {
      const columns = row.split(",");
      console.log("columns", columns);
      return {
        date: columns[0].trim(),
        consumption: parseFloat(columns[1].trim()),
      };
    });
  },
};
