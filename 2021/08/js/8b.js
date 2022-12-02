const fs = require("fs");
const buffer = fs.readFileSync("./input.txt");
const fileContent = buffer.toString();

const decode = fileContent
  .split("\n")
  .filter((el) => !!el)
  .map((el) => el.split("|")[0])
  .map((el) => el.split(" ").filter((el) => !!el));
const numbers = fileContent
  .split("\n")
  .filter((el) => !!el)
  .map((el) => el.split("|")[1])
  .map((el) => el.split(" ").filter((el) => !!el));

function getNumFromPossibility(possibility, num) {
  const topRight = possibility[1];
  const bottomRight = possibility[2];
  const topLeft = possibility[3];
  const middle = possibility[4];
  const bottomLeft = possibility[6];

  if (num.length === 7) return 8;
  if (num.length === 2) return 1;
  if (num.length === 4) return 4;
  if (num.length === 3) return 7;
  if (num.length === 6 && !num.includes(middle)) return 0;
  if (num.length === 6 && num.includes(topRight) && num.includes(middle))
    return 9;
  if (num.length === 6 && num.includes(bottomLeft) && num.includes(middle))
    return 6;
  if (num.length === 5 && num.includes(topRight) && num.includes(bottomRight))
    return 3;
  if (num.length === 5 && !num.includes(topRight) && !num.includes(bottomLeft))
    return 5;
  if (num.length === 5 && !num.includes(topLeft) && !num.includes(bottomRight))
    return 2;
  return null;
}

function isGoodPossibility(forDecoding, possibility) {
  let numFound = forDecoding.reduce(
    (acc, num) =>
      getNumFromPossibility(possibility, num) !== null ? acc + 1 : acc,
    0
  );
  return numFound === forDecoding.length;
}

function posibilities(deduction, allPossibilities = [], index = 0) {
  const list1 = [...allPossibilities, deduction[index][0]];
  const list2 = [...allPossibilities, deduction[index][1]];
  return index === deduction.length - 1
    ? [list1, list2]
    : [
        posibilities(deduction, list1, index + 1),
        posibilities(deduction, list2, index + 1),
      ];
}

function getDeduction(forDecoding) {
  const one = forDecoding.filter((el) => el.length === 2)[0];
  const seven = forDecoding.filter((el) => el.length === 3)[0];
  const four = forDecoding.filter((el) => el.length === 4)[0];
  const rest = ["a", "b", "e", "d", "c", "f", "g"].filter(
    (c) => ![...one, ...four, ...seven].includes(c)
  );

  return [
    seven.split("").filter((c) => !one.includes(c)),
    one,
    one,
    four.split("").filter((c) => !one.includes(c)),
    four.split("").filter((c) => !one.includes(c)),
    rest,
    rest,
  ];
}

function virtualNb(forDecoding, number) {
  const deduction = getDeduction(forDecoding);
  const allPosibilities = posibilities(deduction)
    .flat(deduction.length - 1)
    .filter((el) => {
      for (let c of el) {
        if (el.filter((v) => v === c).length > 1) return false;
      }
      return true;
    });
  const goodPossibility = allPosibilities.find((possibility) =>
    isGoodPossibility(forDecoding, possibility)
  );
  return Number(
    number.reduce(
      (acc, nb) => acc + getNumFromPossibility(goodPossibility, nb),
      ""
    )
  );
}

function start(forDecoding, numToGuess) {
  return numToGuess.reduce(
    (sum, nb, i) => sum + virtualNb(forDecoding[i], nb),
    0
  );
}
