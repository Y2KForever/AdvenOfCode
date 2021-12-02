const fs = require("fs");
const file = fs.readFileSync("./input.txt", { flag: "r", encoding: "utf-8" });
const split = file.split("\n");

let forward = 0;
let depth = 0;

for (i = 0; i < split.length; i++) {
  if (split[i].includes("forward")) {
    forward = forward + parseInt(split[i].substr(split[i].length - 1));
  } else if (split[i].includes("up")) {
    depth = depth - parseInt(split[i].substr(split[i].length - 1));
  } else if (split[i].includes("down")) {
    depth = depth + parseInt(split[i].substr(split[i].length - 1));
  }
}

const answer = console.log(forward * depth);
