const fs = require("fs");
const file = fs.readFileSync("./input.txt", { flag: "r", encoding: "utf-8" });
const split = file.split("\n");

const answer = split
  .map(Number)
  .reduce((previousValue, currentValue, index, array) => {
    if (index > 0 && currentValue > array[index - 1]) {
      return previousValue + 1;
    }
    return previousValue;
  }, 0);

console.log(answer);
