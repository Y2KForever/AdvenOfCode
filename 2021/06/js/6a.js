const fs = require("fs");

const fishes = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(",")
  .map((item) => parseInt(item));
const days = 80;
let arrayOfFishes = new Array(9).fill(0);
fishes.forEach((time) => arrayOfFishes[time]++);

for (let i = 0; i < days; i++) {
  const resetFishes = arrayOfFishes.shift();
  arrayOfFishes = [...arrayOfFishes, resetFishes];
  arrayOfFishes[6] += resetFishes;
}
let answer = arrayOfFishes.reduce((acc, val) => acc + val, 0);

console.log(answer);
