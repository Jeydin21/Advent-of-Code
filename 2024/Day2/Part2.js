const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const lines = input.replace(/\r/g, "").split("\n").filter(x => x !== "").map(x => x.split(" ").map(Number));

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

    if ((decrease && increase) || (!decrease && !increase) || biggestChange > 3 || smallestChange < 1) {
      for (let j = 0; j < report.length; j++) {
        let temp = report.slice();
        temp.splice(j, 1);
        biggestChange = undefined;
        smallestChange = undefined;
        decrease = false;
        increase = false;

        for (let k = 1; k < temp.length; k++) {
          if (temp[k] < temp[k - 1]) decrease = true;
          if (temp[k] > temp[k - 1]) increase = true;

          const tempChange = Math.abs(temp[k] - temp[k - 1]);
          biggestChange = typeof biggestChange !== "undefined" ? Math.max(biggestChange, tempChange) : tempChange;
          smallestChange = typeof smallestChange !== "undefined" ? Math.min(smallestChange, tempChange) : tempChange;
        }

        if (((decrease && !increase) || (!decrease && increase)) && biggestChange <= 3 && smallestChange >= 1) break;
      }
      break;
    }
  }

  return ((decrease && !increase) || (!decrease && increase)) && biggestChange <= 3 && smallestChange >= 1;
}).length;

console.log(safeReportsCount);