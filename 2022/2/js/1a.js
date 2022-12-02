const fs = require("fs");
const file = fs.readFileSync(
  "/Users/hansen/Desktop/AdventOfCode/2022/2/input.txt",
  { flag: "r", encoding: "utf-8" }
);
const split = file.split("\n");

const rules = {
  X: {
    points: 1,
    win: "C",
    draw: "A",
  },
  Y: {
    points: 2,
    win: "A",
    draw: "B",
  },
  Z: {
    points: 3,
    win: "B",
    draw: "C",
  },
};

const score = [];

split.forEach((val) => {
  const thisVal = val.split(" ");
  if (rules[thisVal[1]].win === thisVal[0]) {
    score.push(rules[thisVal[1]].points + 6);
  } else if (rules[thisVal[1]].draw === thisVal[0]) {
    score.push(rules[thisVal[1]].points + 3);
  } else {
    score.push(rules[thisVal[1]].points);
  }
});

const answer = score.reduce((curr, prev) => curr + prev, 0);

console.log(answer);
