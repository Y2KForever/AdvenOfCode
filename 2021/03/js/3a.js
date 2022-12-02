const fs = require("fs");
const file = fs.readFileSync("../input.txt", { flag: "r", encoding: "utf-8" });
const split = file.split("\n").map((line) => line.trim().split(""));
const gammaRateBits = [];
const epsilonRateBits = [];
const counters = Array.from({ length: split[0].length }).map(() => 0);

for (let n = 0; n < split.length; n++) {
  const number = split[n];

  for (let digit = 0; digit < number.length; digit++) {
    counters[digit] += number[digit] === "1" ? 1 : 0;
  }
}

for (let digit = 0; digit < counters.length; digit++) {
  gammaRateBits.push(counters[digit] > split.length / 2 ? "1" : "0");
  epsilonRateBits.push(counters[digit] < split.length / 2 ? "1" : "0");
}

const gammaRate = parseInt(gammaRateBits.join(""), 2);
const epsilonRate = parseInt(epsilonRateBits.join(""), 2);
const powerConsumption = gammaRate * epsilonRate;

console.log(powerConsumption);
