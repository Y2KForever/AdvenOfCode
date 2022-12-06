const { readInput } = require("../../utils");
const split = readInput("2022/06/input.txt").toString();

let buffer = [];
const num = 14;
let answer = 0;

for (let i = num; i < split.length; i++) {
  buffer = split.slice(i - num, i).split("");
  const res = buffer.filter((el, index) => buffer.indexOf(el) === index);
  if (res.length === num) {
    answer = i;
    break;
  }
}

console.log(answer);
