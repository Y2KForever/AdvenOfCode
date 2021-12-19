const fs = require("fs");
const fileContents = fs
  .readFileSync("../input.txt")
  .toString("utf8")
  .split("\r\n");

const map = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const pointMap = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const points = fileContents
  .map((line) => {
    const stack = [];
    for (let char of line) {
      if (map[char]) stack.push(char);
      else {
        const lastOpen = stack.pop();
        if (map[lastOpen] !== char) return 0;
      }
    }

    let point = 0;
    while (stack.length) {
      const lastChar = stack.pop();
      point = point * 5 + pointMap[map[lastChar]];
    }
    return point;
  })
  .filter((item) => item)
  .sort((a, b) => a - b);

  console.log(points);

console.log(points[Math.floor(points.length / 2)]);
