const fs = require("fs");

const input = fs
  .readFileSync("../../input.txt", "utf8")
  .toString()
  .trim()
  .split("\r\n\r\n");

const answer = input
  .map((elf) => {
    return elf
      .split("\n")
      .map((item) => parseInt(item, 10))
      .reduce((sum, v) => sum + v, 0);
  })
  .sort((a, z) => z - a);

console.log(answer[0]);

console.log(
  "Part Two:",
  sumsSorted.slice(0, 3).reduce((sum, v) => sum + v, 0)
);
