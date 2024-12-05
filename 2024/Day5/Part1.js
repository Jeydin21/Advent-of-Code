const fs = require("fs");

// Read the input data from the file
const input = fs.readFileSync("input.txt", "utf8").replace(/\r/g, "").split("\n\n");

// Process the rules and pages
const rulesList = input[0].split("\n").filter(x => x !== "").map(x => x.split("|").map(Number));
const pageList = input[1].split("\n").filter(x => x !== "").map(x => x.split(",").map(Number));

// Create a dictionary for the rules
const rules = {};
for (const rule of rulesList) {
  if (!rules[rule[0]]) {
    rules[rule[0]] = [];
  }
  rules[rule[0]].push(rule[1]);
}

// Find the correct pages
const correctPages = [];
for (let i = 0; i < pageList.length; i++) {
  const pages = pageList[i];
  let correct = true;

  for (let j = 0; j < pages.length; j++) {
    const page = pages[j];
    const pagesAfter = pages.slice(j + 1);

    if (!rules[page]) continue;

    for (const rule of rules[page]) {
      if (pages.includes(rule) && !pagesAfter.includes(rule)) {
        correct = false;
        break;
      }
    }

    if (!correct) break;
  }

  if (correct) correctPages.push(i);
}

// Calculate and print the result
const result = correctPages.reduce((sum, index) => sum + pageList[index][Math.floor(pageList[index].length / 2)], 0);
console.log(result);