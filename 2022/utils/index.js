const readInput = (input) => {
  const fs = require("fs");
  const file = fs.readFileSync(input, {
    flag: "r",
    encoding: "utf-8",
  });
  return file.split(process.platform === "win32" ? "\r\n" : "\n");
};

module.exports = { readInput };
