
console.log("Args", process.argv);
const fs = require('fs'); 

const stats = require("./commands/stats");
const filter = require("./commands/filter"); 
const sortCSV = require("./commands/sort"); 
const exportCSV = require("./commands/export");



const args = process.argv.slice(2);

const [command, file, column, value] = args;

if (!command) {
  console.log("Usage: csvtool <command> <file> [column] [value]");
  console.log("Commands: stats | filter | sort");
  process.exit(0);
}

switch (command) {
  case "stats":
    stats(file);
    break;

  case "filter":
    if (!file || !column || !value) {
      console.error("Usage: filter <file> <column> <value>");
      process.exit(1);
    }
    filter(file, column, value);
    break;

  case "sort":
    if (!file || !column) {
      console.error("Usage: sort <file> <column>");
      process.exit(1);
    }
    sortCSV(file, column);
    break;

    case "export":
   if (!file || !column) {
      console.error("Usage: export <file> <output_file>");
      process.exit(1);
   }
   const data = fs.readFileSync(file, "utf8").trim().split("\n");
   const headers = data[0].split(",").map(h => h.trim());
   const rows = data.slice(1).map(r => r.split(",").map(c => c.trim()));
    exportCSV(rows, headers, column); 
  break;

  default:
    console.error("Not a command:", command);
}


const myFile = process.argv[2];

const data = fs.readFileSync("data/data.csv", "utf8");
const exportData = fs.readFileSync(file, "utf8").trim().split("\n");

const rows = exportData.slice(1).map(r => r.split(",").map(c => c.trim()));
const lines = data.trim().split("\n");
const headers = lines[0].split(',').map(h => h.trim());
const result = [];

for (let row = 1; row < lines.length; row ++){
   const values = lines[row].split(",");

   const object = {};

   for(let i = 0; i < headers.length; i++){

      let value = values[i]?.trim();


      if(headers[i] === "price"){
         object[headers[i]] = Number(value);
      }else{
         object[headers[i]] = value;
      }
      }

     result.push(object);
}


console.table(result);




