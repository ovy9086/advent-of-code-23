import * as fs from "fs";

const content = fs
  .readFileSync("assets/input03.txt", "utf-8")
  .split("\n")
  .filter((line) => line.length > 0)
  .map((line) => line.split(""));

const directionsXY = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
] as const;

type MaybeGear = {
  adjacentParts: number;
  gearRatio: number;
};

//Mapping every '*' to a "Gear" - as I want to re-use the previous part logic to gather the stuff
let data = content.map((line) =>
  line.map((c) => {
    if (c === "*") {
      return {
        adjacentParts: 0,
        gearRatio: 1,
      };
    }
    return c;
  })
);

function isGear(data): data is MaybeGear {
  return typeof data === "object" && "gearRatio" in data;
}

function isNumber(char) {
  return !isNaN(parseInt(char));
}

let currentNumber = 0;
let adjacentGears = new Set<MaybeGear>(); //gather here all the adjacent gears

for (let i = 0; i < content.length; i++) {
  if (currentNumber > 0) {
    adjacentGears.forEach((g) => {
      g.adjacentParts += 1;
      g.gearRatio *= currentNumber;
    });
  }
  currentNumber = 0;
  adjacentGears.clear();

  for (let j = 0; j < content[i].length; j++) {
    if (isNumber(content[i][j])) {
      currentNumber = currentNumber * 10 + +content[i][j];
      directionsXY.forEach(([x, y]) => {
        const cur = data[i + y]?.[j + x];
        if (isGear(cur)) {
          console.log("add to gears", cur);
          adjacentGears.add(cur);
        }
      });
    } else {
      if (currentNumber > 0) {
        adjacentGears.forEach((g) => {
          g.adjacentParts += 1;
          g.gearRatio *= currentNumber;
        });
      }
      currentNumber = 0;
      adjacentGears.clear();
    }
  }
}

let allGears: MaybeGear[] = [].concat(...data).filter((data) => isGear(data));

const result = allGears.filter((it) => it.adjacentParts === 2).reduce((a, b) => a + b.gearRatio, 0);

console.log("SUM:", result);
