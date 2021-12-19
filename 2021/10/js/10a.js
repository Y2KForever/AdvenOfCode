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

const score = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const points = fileContents.map((line) => {
  const stack = [];
  for (let char of line) {
    if (map[char]) stack.push(char);
    else {
      const lastOpen = stack.pop();
      if (map[lastOpen] !== char) return score[char];
    }
  }
  return 0;
});

console.log(points.reduce((previous, current) =>  previous + current));