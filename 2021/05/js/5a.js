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

const filteredData = data.filter(
  (s) => s.from.x === s.to.x || s.from.y === s.to.y
);
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
for (const segment of filteredData) {
  const isHorizontal = segment.from.y === segment.to.y;
  let currentPoint = { x: segment.from.x, y: segment.from.y };

  while (currentPoint.x !== segment.to.x || currentPoint.y !== segment.to.y) {
    addPoint([currentPoint.x, currentPoint.y].join(`,`));

    if (isHorizontal) {
      currentPoint.x += currentPoint.x < segment.to.x ? 1 : -1;
    } else {
      currentPoint.y += currentPoint.y < segment.to.y ? 1 : -1;
    }
  }
  addPoint([currentPoint.x, currentPoint.y].join(`,`));
}

console.log(count);
