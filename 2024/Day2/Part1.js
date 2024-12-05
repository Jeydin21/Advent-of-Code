const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.replace(/\r/g, "")
  .split("\n")
  .filter(x => x !== "")
  .map(x => x.split(" ").map(Number));

const safeReportsCount = lines.filter(report => {
  let biggestChange;
  let smallestChange;
  let decrease = false;
  let increase = false;

  for (let i = 1; i < report.length; i++) {
    if (report[i] < report[i - 1]) decrease = true;
    if (report[i] > report[i - 1]) increase = true;

    const change = Math.abs(report[i] - report[i - 1]);
    biggestChange = typeof biggestChange !== "undefined" ? Math.max(biggestChange, change) : change;
    smallestChange = typeof smallestChange !== "undefined" ? Math.min(smallestChange, change) : change;
  }

  return ((decrease && !increase) || (!decrease && increase)) && biggestChange <= 3 && smallestChange >= 1;
}).length;

console.log(safeReportsCount);