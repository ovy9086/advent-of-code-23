import * as fs from "fs";

const content = fs
  .readFileSync("assets/input04.txt", "utf-8")
  .split("\n")
  .filter((line) => line.length > 0);

let sum = 0;

content.forEach((game, idx) => {
  const [winners, mine] = game.split(":")[1].split("|");
  const winnersUnique = new Set();
  winners
    .trim()
    .split(" ")
    .forEach((w) => {
      winnersUnique.add(w);
    });
  
  const myWinnersCount = mine
    .trim()
    .split(" ")
    .filter((m) => winnersUnique.has(m)).length;

  sum += myWinnersCount > 0 ? Math.pow(2, myWinnersCount - 1) : 0;
});

console.log("SUM", sum);
