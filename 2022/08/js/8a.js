const { readInput } = require("../../utils");
const split = readInput("../input.txt");

let grid = [];

for (const line of split) {
  grid.push(line.split("").map((value) => parseInt(value)));
}

const rows = grid.length;
const cols = grid[0].length;

const isVisible = (y, x) => {
  const selectedTree = grid[y][x];

  if (y === 0 || y === rows - 1) {
    return true;
  }

  if (x === 0 || x === cols - 1) {
    return true;
  }

  let isBlockedFromTop = false;
  let isBlockedFromBottom = false;
  let isBlockedFromLeft = false;
  let isBlockedFromRight = false;

  for (let iy = 0; iy < rows; iy++) {
    for (let ix = 0; ix < cols; ix++) {
      if (grid[iy][ix] >= selectedTree) {
        if (iy === y && ix < x) {
          isBlockedFromLeft = true;
        }

        if (iy === y && ix > x) {
          isBlockedFromRight = true;
        }

        if (ix === x && iy < y) {
          isBlockedFromTop = true;
        }

        if (ix === x && iy > y) {
          isBlockedFromBottom = true;
        }
      }
    }
  }

  return (
    !isBlockedFromTop ||
    !isBlockedFromBottom ||
    !isBlockedFromLeft ||
    !isBlockedFromRight
  );
};

const total = [];

for (let iy = 0; iy < rows; iy++) {
  for (let ix = 0; ix < cols; ix++) {
    if (isVisible(iy, ix)) {
      total.push(1);
    }
  }
}

const answer = total.reduce((p, c) => p + c, 0);

console.log(answer);
