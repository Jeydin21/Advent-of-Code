const fs = require("fs");

// Read the input data from the file
const input = fs.readFileSync("input.txt", "utf8");

// Regular expression to match valid mul(X,Y) instructions
const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

let match;
let totalSum = 0;

// Find all matches and calculate the sum of the multiplications
while ((match = regex.exec(input)) !== null) {
  const x = parseInt(match[1], 10);
  const y = parseInt(match[2], 10);
  totalSum += x * y;
}

console.log(totalSum);