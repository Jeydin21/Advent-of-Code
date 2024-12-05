const fs = require("fs");

// Read the input data from the file
const input = fs.readFileSync("input.txt", "utf8");

// Process the input data
const lines = input
  .replace(/\r/g, "")
  .split("\n")
  .filter(line => line !== "")
  .map(line => line.split(" ").filter(num => num !== "").map(num => Number(num.trim())));

// Split the data into two lists and sort them
const list1 = lines.map(pair => pair[0]).sort((a, b) => a - b);
const list2 = lines.map(pair => pair[1]).sort((a, b) => a - b);

// Calculate the total distance
const totalDistance = list1.reduce((acc, num) => acc + num * list2.filter(y => y === num).length, 0);

console.log(totalDistance);