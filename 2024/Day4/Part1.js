const fs = require("fs");

// Read the input data from the file
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

// Define the search word
const word = "XMAS";
const wordLength = word.length;

// Directions for searching: Right, left, down, up, diagonals
const directions = [
  [0, 1], [0, -1], [1, 0], [-1, 0], // Horizontal and vertical
  [1, 1], [1, -1], [-1, 1], [-1, -1] // Diagonals
];

// Function to check if "XMAS" exists in a given direction
function checkDirection(grid, row, col, dirRow, dirCol) {
  for (let i = 0; i < wordLength; i++) {
    const newRow = row + i * dirRow;
    const newCol = col + i * dirCol;
    if (
      newRow < 0 || newRow >= grid.length ||
      newCol < 0 || newCol >= grid[0].length ||
      grid[newRow][newCol] !== word[i]
    ) {
      return false;
    }
  }
  return true;
}

// Function to count all the occurrences of "XMAS" in the grid
function countOccurrences(grid) {
  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      for (const [dirRow, dirCol] of directions) {
        if (checkDirection(grid, row, col, dirRow, dirCol)) {
          count++;
        }
      }
    }
  }
  return count;
}

// Convert the input to a 2D array
const grid = input.map(line => line.split(""));

const totalOccurrences = countOccurrences(grid);
console.log(totalOccurrences);