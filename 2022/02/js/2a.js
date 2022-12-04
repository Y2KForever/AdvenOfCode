const rules = {
  X: {
    points: 1,
    win: "C",
    draw: "A",
  },
  Y: {
    points: 2,
    win: "A",
    draw: "B",
  },
  Z: {
    points: 3,
    win: "B",
    draw: "C",
  },
};

const score = [];

split.forEach((val) => {
  const thisVal = val.split(" ");
  if (rules[thisVal[1]]?.win === thisVal[0]) {
    score.push(rules[thisVal[1]]?.points + 6);
  } else if (rules[thisVal[1]]?.draw === thisVal[0]) {
    score.push(rules[thisVal[1]]?.points + 3);
  } else {
    score.push(rules[thisVal[1]]?.points ?? 0);
  }
});

const answer = score.reduce((curr, prev) => curr + prev, 0);

console.log(answer);
