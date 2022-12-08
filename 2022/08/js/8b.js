const { readInput } = require("../../utils");
const split = readInput("../input.txt");

let grid = [];

for (const line of split) {
  grid.push(line.split("").map((value) => parseInt(value)));
}

const rows = grid.length;
const cols = grid[0].length;

const calcScenicScore = (y, x) => {
  const selectedTree = grid[y][x];

  let toTop = 0;
  let toBottom = 0;
  let toLeft = 0;
  let toRight = 0;

  for (let ix = x - 1; ix >= 0; ix--) {
    toLeft++;

    if (grid[y][ix] >= selectedTree) {
      break;
    }
  }

  for (let ix = x + 1; ix < cols; ix++) {
    toRight++;

    if (grid[y][ix] >= selectedTree) {
      break;
    }
  }

  for (let iy = y - 1; iy >= 0; iy--) {
    toTop++;

    if (grid[iy][x] >= selectedTree) {
      break;
    }
  }

  for (let iy = y + 1; iy < rows; iy++) {
    toBottom++;

    if (grid[iy][x] >= selectedTree) {
      break;
    }
  }

  return toTop * toBottom * toLeft * toRight;
};

let answer = 0;

for (let iy = 0; iy < rows; iy++) {
  for (let ix = 0; ix < cols; ix++) {
    answer = Math.max(answer, calcScenicScore(iy, ix));
  }
}

console.log(answer);
