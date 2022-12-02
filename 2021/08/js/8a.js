const fs = require("fs");
const buffer = fs.readFileSync("./input.txt");
const fileContent = buffer.toString();

const numbers = fileContent
  .split("\n")
  .filter((el) => !!el)
  .map((el) => el.split("|")[1])
  .map((el) => el.split(" ").filter((el) => !!el));
let counter = 0;

numbers.forEach((t) => {
  t.forEach((m) => {
    if (m.length === 2 || m.length === 3 || m.length === 4 || m.length === 7) {
      counter++;
    }
  });
});

console.log(counter);
