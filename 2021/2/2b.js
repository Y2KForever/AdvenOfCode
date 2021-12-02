const fs = require("fs");
const file = fs.readFileSync("./input.txt", { flag: "r", encoding: "utf-8" });
const split = file.split("\n");

let horizontal = 0;
let depth = 0;
let aim = 0;

for (i = 0; i < split.length; i++) {
  if (split[i].includes("forward")) {
    horizontal = horizontal + parseInt(split[i].substr(split[i].length - 1));
    depth = depth + aim * parseInt(split[i].substr(split[i].length - 1));
  } else if (split[i].includes("up")) {
    aim = aim - parseInt(split[i].substr(split[i].length - 1));
  } else if (split[i].includes("down")) {
    aim = aim + parseInt(split[i].substr(split[i].length - 1));
  }
}

const answer = console.log(horizontal * depth);
