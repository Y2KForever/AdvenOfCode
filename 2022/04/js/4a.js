const { readInput } = require("../../utils");
const split = readInput("../input.txt");

const pairs = [];

split.forEach((pair) => {
  const pair1 = Array.from(
    {
      length:
        (pair.split(",")[0].split("-")[1] - pair.split(",")[0].split("-")[0]) /
          1 +
        1,
    },
    (_, i) => parseInt(pair.split(",")[0].split("-")[0]) + i * 1
  );
  const pair2 = Array.from(
    {
      length:
        (pair.split(",")[1].split("-")[1] - pair.split(",")[1].split("-")[0]) /
          1 +
        1,
    },
    (_, i) => parseInt(pair.split(",")[1].split("-")[0]) + i * 1
  );

  if (
    pair1.every((v) => pair2.includes(v)) ||
    pair2.every((v) => pair1.includes(v))
  ) {
    pairs.push(1);
  }
});

const answer = pairs.reduce((curr, prev) => curr + prev, 0);

console.log(answer);
