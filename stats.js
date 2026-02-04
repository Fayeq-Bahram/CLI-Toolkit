
const fs = require('fs');  
const myFile = process.argv[2];

const data = fs.readFileSync("data/data.csv", "utf8");
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

const totalItem = result.length;
const prices = result.map(item => Number(item.price)).filter(p => !isNaN(p));
const totalPrice = prices.reduce((sum , p) => sum + p, 0);
const averagePrice = totalPrice / totalItem;
const minPrice = Math.min(...prices);
const maxPrice = Math.max(...prices);

console.log("\n >>> CSV Data Statistics <<<<");
console.log("________________________________")
console.log("* Total Items:", totalItem );
console.log("* Total Price:", totalPrice);
console.log("* Average:", averagePrice.toFixed(2));
console.log("* Min Price:", minPrice);
console.log("* Maximum Price:", maxPrice);



