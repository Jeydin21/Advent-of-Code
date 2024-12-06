const fs = require("fs");

// Read the input data from the file
const input = fs.readFileSync("input.txt", "utf8");
const mapped = input.replace(/\r/g, "").split("\n").filter(x => x !== "").map(x => x.split(""));

// Initialize direction and position
let xDirection = 0;
let yDirection = -1;
const areasVisited = mapped.map(row => row.map(() => false));
let y = mapped.findIndex(row => row.includes("^"));
let x = mapped[y].indexOf("^");

// Function to turn right 90 degrees
function turnRight() {
  if (xDirection === 0 && yDirection === -1) {
    xDirection = 1;
    yDirection = 0;
  } else if (xDirection === 1 && yDirection === 0) {
    xDirection = 0;
    yDirection = 1;
  } else if (xDirection === 0 && yDirection === 1) {
    xDirection = -1;
    yDirection = 0;
  } else if (xDirection === -1 && yDirection === 0) {
    xDirection = 0;
    yDirection = -1;
  }
}

// Simulate the guard's movement
while (x >= 0 && x < mapped[0].length && y >= 0 && y < mapped.length) {
  areasVisited[y][x] = true;

  const movedX = x + xDirection;
  const movedY = y + yDirection;

  if (movedX < 0 || movedX >= mapped[0].length || movedY < 0 || movedY >= mapped.length) break;

  if (mapped[movedY][movedX] === "#") {
    turnRight();
  } else {
    x = movedX;
    y = movedY;
  }
}

// Count the number of distinct positions visited
const distinctPositions = areasVisited.flat().filter(visited => visited).length;
console.log(distinctPositions);