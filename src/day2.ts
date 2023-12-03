import * as fs from "fs";

const gameRegex = /Game\s(\d*):(.*)/;
const colorsRegex = /(\d+)\s(red|green|blue)/g;

const filePath = "assets/input02.txt";
const fileContent = fs.readFileSync(filePath, "utf-8");
const lines = fileContent.split("\n");

let ID_SUM = 0;
let setsPowerSum = 0;

lines.forEach((line, index) => {
  console.log(`\n\nLine ${index + 1}: ${line}`);
  const lineID = isGamePossible(line);
  console.log("SUM for now...", ID_SUM);
  ID_SUM += lineID ?? 0;
});

console.log("File has been read completely.", ID_SUM);

function isGamePossible(line: string): number | undefined {
  const gameRequirements = { red: 12, green: 13, blue: 14 } as const;

  if (gameRegex.test(line)) {
    const result = gameRegex.exec(line);
    const roundId = result[1];
    const rounds = result[2].split(";");
    let possible = true;
    const colorsPowers = { red: 0, green: 0, blue: 0 };
    for (let i = 0; i < rounds.length; i++) {
      const colors = { red: 0, green: 0, blue: 0 };
      let match: RegExpExecArray;
      while ((match = colorsRegex.exec(rounds[i]))) {
        colors[match[2]] += +match[1];
        colorsPowers[match[2]] = Math.max(colorsPowers[match[2]], +match[1]);
      }
      console.log("GAME", colors);
      if (
        !(
          colors.red <= gameRequirements.red &&
          colors.green <= gameRequirements.green &&
          colors.blue <= gameRequirements.blue
        )
      ) {
        console.warn("This Game is not possible.");
        possible = false;
      }
    }
    setsPowerSum += colorsPowers.red * colorsPowers.green * colorsPowers.blue;
    console.log("POWER SETS", setsPowerSum);
    if (possible) {
      console.warn("This Game is possible!", +roundId);
      return +roundId;
    }
  }

  return undefined;
}
