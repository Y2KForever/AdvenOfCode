const { readInput } = require("../../utils");
const split = readInput("../input.txt");

const points = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
  ["d", 4],
  ["e", 5],
  ["f", 6],
  ["g", 7],
  ["h", 8],
  ["i", 9],
  ["j", 10],
  ["k", 11],
  ["l", 12],
  ["m", 13],
  ["n", 14],
  ["o", 15],
  ["p", 16],
  ["q", 17],
  ["r", 18],
  ["s", 19],
  ["t", 20],
  ["u", 21],
  ["v", 22],
  ["w", 23],
  ["x", 24],
  ["y", 25],
  ["z", 26],
  ["A", 27],
  ["B", 28],
  ["C", 29],
  ["D", 30],
  ["E", 31],
  ["F", 32],
  ["G", 33],
  ["H", 34],
  ["I", 35],
  ["J", 36],
  ["K", 37],
  ["L", 38],
  ["M", 39],
  ["N", 40],
  ["O", 41],
  ["P", 42],
  ["Q", 43],
  ["R", 44],
  ["S", 45],
  ["T", 46],
  ["U", 47],
  ["V", 48],
  ["W", 49],
  ["X", 50],
  ["Y", 51],
  ["Z", 52],
]);

const res = [];

split.forEach((rugsack) => {
  const compartment1 = new Set(rugsack.substring(0, rugsack.length / 2));
  const compartment2 = new Set(
    rugsack.substring(rugsack.length / 2, rugsack.length)
  );

  for (let char of compartment1.values()) {
    if (compartment2.has(char)) {
      res.push(points.get(char));
    }
  }
});

const answer = res.reduce((prev, curr) => prev + curr, 0);

console.log(answer);
