const fs = require("fs");

module.exports = function exportCSV(dataRows, headers, outputFile) 
{
  if (!outputFile) {
    console.error("Please provide an output file name.");
    return;
  }


  let csvContent;

  if (Array.isArray(dataRows[0])) {

    csvContent = [headers.join(","), ...dataRows.map(r => r.join(","))].join("\n");
  } else {

    csvContent = [
      headers.join(","),
      ...dataRows.map(row => headers.map(h => row[h]).join(","))
    ].join("\n");
  }

  fs.writeFileSync(outputFile, csvContent, "utf8");
  console.log(`Data exported successfully to ${outputFile}`);
};
