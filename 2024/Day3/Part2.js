const fs = require("fs");

// Read the input data from the file
const input = fs.readFileSync("input.txt", "utf8");

// Process the input data
const lines = input
  .replace(/\r/g, "")
  .split("\n")
  .filter(x => x !== "")
  .map(x => x.matchAll(/(?:mul\((\d+),(\d+)\))|(?:do\(\))|(?:don't\(\))/g));

let enabled = true;

const totalSum = lines.reduce((acc, matches) => {
  if (!matches) return acc;

  let result = 0;
  for (let match of matches) {
    if (match[0] === "don't()") {
      enabled = false;
    } else if (match[0] === "do()") {
      enabled = true;
    } else if (enabled) {
      result += parseInt(match[1], 10) * parseInt(match[2], 10);
    }
  }

  return acc + result;
}, 0);

console.log(`Total sum: ${totalSum}`);