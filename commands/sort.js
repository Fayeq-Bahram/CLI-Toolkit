
const fs = require("fs");

module.exports = function sortCSV(file, column) {

  const data = fs.readFileSync(file, "utf8").trim().split("\n");

  if (data.length === 0) {
    console.error("CSV is empty!");
    return;
  }


  const headers = data[0].split(",").map(h => h.trim());
  const columnIndex = headers.indexOf(column);

  if (columnIndex === -1) {
    console.error(`Column "${column}" not found!`);
    return;
  }

  const rows = data.slice(1).map(row =>
    row.split(",").map(cell => cell.trim())
  );
  const isNumeric = rows.every(row => !isNaN(row[columnIndex]));
  
  rows.sort((a, b) => {
    if (isNumeric) {
      return Number(a[columnIndex]) - Number(b[columnIndex]);
    } else {
      return a[columnIndex].localeCompare(b[columnIndex]);
    }
  });

  console.table([headers, ...rows].map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  }));
};
