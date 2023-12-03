import * as fs from "fs";
const filePath = "assets/input02.txt";
const fileLines = fs.readFileSync(filePath, "utf-8").split("\n");

const max = {
  red: 12,
  green: 13,
  blue: 14,
};

const sum = fileLines
  .map((line, index) => {
    if (!line) {
      return 0;
    }
    let valid = true;
    const games = line.split(":")[1].split(";");
    games.forEach((game) => {
      const colors = game.trim().split(",");
      colors.forEach((color) => {
        const parts = color.trim().split(" ");
        if (+parts[0] > max[parts[1]]) {
          valid = false;
        }
      });
    });
    return valid ? index + 1 : 0;
  })
  .reduce((prev, curr) => prev + curr, 0);
