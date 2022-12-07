const { readInput } = require("../../utils");
const split = readInput("../input.txt");

const ROOT = "/";
let total_filesize = 0;
let folder_sizes = {};
let pwd = [ROOT];

for (let line of split) {
  const parts = line.split(" ");
  const isCommand = parts[0] == "$";
  const isCd = isCommand && parts[1] == "cd";

  if (isCd && parts[2] == "..") {
    pwd.pop();
  } else if (isCd && parts[2] != "/") {
    pwd.push(parts[2]);
  } else if (!isCommand && parts[0] != "dir") {
    size = parseInt(parts[0]);

    let tmp = [...pwd];

    while (tmp.length > 0) {
      key = tmp.join(".");

      if (!(key in folder_sizes)) {
        folder_sizes[key] = 0;
      }

      folder_sizes[key] += size;
      tmp.pop();
    }

    total_filesize += size;
  }
}

const smaller_than = Object.values(folder_sizes).filter((n) => n <= 100_000);
const answer = smaller_than.reduce((prev, curr) => prev + curr, 0);

console.log(answer);
