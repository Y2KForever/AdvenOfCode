const fs = require("fs");

const data = fs.readFileSync("./input.txt").toString().trim().split("\n\n");

const numbersToDraw = data[0]
  .trim()
  .split(",")
  .map((x) => parseInt(x));

const boards = data
  .slice(1)
  .map(parseDataToRowArrays)
  .map(convertToBoardObject);

let scores = [];
for (let i = 5; boards.length != 0 || numbersToDraw.length != i; i++) {
  const drawnNumbers = numbersToDraw.slice(0, i + 1);
  scores.push(
    ...boards
      .filter((board) => isBoardComplete(board, drawnNumbers))
      .map((x) => removeBoardFromStorage(x, boards))
      .map((x) => computeScore(x, drawnNumbers))
      .sort()
      .reverse()
  );
}
console.log(scores[scores.length - 1]);

function removeBoardFromStorage(board, boardStorage) {
  const idx = boardStorage.indexOf(board);
  boardStorage.splice(idx, 1);
  return board;
}

function parseDataToRowArrays(data) {
  return data.split("\n").map((row) =>
    row
      .trim()
      .split(/\s+/g)
      .map((x) => parseInt(x))
  );
}
function convertToBoardObject(rows) {
  return {
    rows,
    cols: rows[0].map((_, i) => rows.map((row) => row[i])),
  };
}

function areAllElementsInDrawnNumbers(elementArr, drawnNumbers) {
  return elementArr.every((element) => drawnNumbers.includes(element));
}
function isBoardComplete(board, drawnNumbers) {
  const matchingRows = board.rows.some((row) =>
    areAllElementsInDrawnNumbers(row, drawnNumbers)
  );
  const matchingCols = board.cols.some((col) =>
    areAllElementsInDrawnNumbers(col, drawnNumbers)
  );
  return matchingCols || matchingRows;
}
function computeScore(board, drawnNumbers) {
  return (
    board.rows
      .flatMap((row) => row)
      .flatMap((element) => element)
      .filter((element) => !drawnNumbers.includes(element))
      .reduce((a, b) => a + b) * drawnNumbers[drawnNumbers.length - 1]
  );
}
