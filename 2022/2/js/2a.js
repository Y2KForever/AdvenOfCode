const fs = require("fs");
const file = fs.readFileSync(
  "/Users/hansen/Desktop/AdventOfCode/2022/2/input.txt",
  { flag: "r", encoding: "utf-8" }
);
const split = file.split("\n");

const rules = {
  X: {
    rock: {
      points: 3,
    },
    paper: {
      points: 1,
    },
    scissors: {
      points: 2,
    },
  },
  Y: {
    rock: {
      points: 4,
    },
    paper: {
      points: 5,
    },
    scissors: {
      points: 6,
    },
  },
  Z: {
    rock: {
      points: 8,
    },
    paper: {
      points: 9,
    },
    scissors: {
      points: 7,
    },
  },
};

const hands = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const score = [];

split.forEach((val) => {
  const thisVal = val.split(" ");
  const hand = hands[thisVal[0]];
  score.push(rules[thisVal[1]][hand].points);
});

const answer = score.reduce((curr, prev) => curr + prev, 0);

console.log(answer);
