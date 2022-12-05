const { readInput } = require("../../utils");
const split = readInput("../input.txt");

const instructions = split.filter((el) => el[0] == "m");
let crates = [
  "WRF",
  "THMCDVWP",
  "PMZNL",
  "JCHR",
  "CPGHQTB",
  "GCWLFZ",
  "WVLQZJGC",
  "PNRFWTVC",
  "JWHGRSV",
];
let reg = /\d+/g;

instructions.forEach((el) => {
  let [qty, from, to] = el.match(reg).map(Number);
  from -= 1;
  to -= 1;
  for (let i = 0; i < qty; i++) {
    let char = crates[from][crates[from].length - 1];
    crates[from] = crates[from].substring(0, crates[from].length - 1);
    crates[to] += char;
  }
});

const answer = crates.map((el) => el[el.length - 1]).join("");

console.log(answer);
