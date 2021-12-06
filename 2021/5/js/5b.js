const fs = require("fs");

const data = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [from, to] = line.split(" -> ").map((point) => {
      const [x, y] = point.split(",").map(Number);
      return { x, y };
    });
    return {
      from,
      to,
    };
  });

let count = 0;
const memory = new Map();
function addPoint(key) {
  let content = memory.get(key);
  if (!content) {
    content = 0;
  }
  content++;
  if (content === 2) {
    count++;
  }
  memory.set(key, content);
}
for (const segment of data) {
  const isHorizontal = segment.from.y === segment.to.y;
  const isVertical = segment.from.x === segment.to.x;
  let currentPoint = { x: segment.from.x, y: segment.from.y };

  while (currentPoint.x !== segment.to.x || currentPoint.y !== segment.to.y) {
    addPoint([currentPoint.x, currentPoint.y].join(`,`));

    if (isHorizontal) {
      currentPoint.x += currentPoint.x < segment.to.x ? 1 : -1;
    } else if (isVertical) {
      currentPoint.y += currentPoint.y < segment.to.y ? 1 : -1;
    } else {
      currentPoint.x += currentPoint.x < segment.to.x ? 1 : -1;
      currentPoint.y += currentPoint.y < segment.to.y ? 1 : -1;
    }
  }
  addPoint([currentPoint.x, currentPoint.y].join(`,`));
}

console.log(count);
