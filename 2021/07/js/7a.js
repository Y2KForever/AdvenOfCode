const fs = require("fs");

const fuel = fs
  .readFileSync("/Users/hansen/Documents/random/aoc/2021/7/js/input.txt")
  .toString()
  .trim()
  .split(",")
  .map(Number)
  .sort((a, b) => a - b);

function cost(minFuel) {
  return fuel.reduce((acc, n) => acc + Math.abs(n - minFuel), 0);
}

let minFuel = Math.min(...fuel) + 1;
let costPerFuel = cost(minFuel);
while (true) {
  let next = cost(minFuel + 1);
  if (next > costPerFuel) break;
  minFuel++;
  costPerFuel = next;
}

console.log(costPerFuel);
