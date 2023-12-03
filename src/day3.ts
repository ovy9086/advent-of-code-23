import * as fs from "fs";

const content = fs
  .readFileSync("assets/input03.txt", "utf-8")
  .split("\n")
  .filter((line) => line.length > 0)
  .map((line) => line.split(""));

type MaybeGear = {
  adjacentParts: number;
  gearRatio: string;
};

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

let sum = 0;

function isNumber(char) {
  return !isNaN(parseInt(char));
}

function isSymbol(char) {
  return char !== undefined && !isNumber(char) && !(char === ".");
}

function hasAdjacentSymbols(i: number, j: number, contents: string[][]) {
  let result = false;
  directionsXY.forEach(([x, y]) => {
    if (!result) {
      result = isSymbol(contents[i + y]?.[j + x]);
    }
  });
  return result;
}

//Track the current number as we parse the line
let currentNumber = 0;
//Track if the current number is a 'part number', this means it has adjacent symbols
let isPartNumber = false;

for (let i = 0; i < content.length; i++) {
  if (isPartNumber) {
    sum += currentNumber;
  }
  currentNumber = 0;
  isPartNumber = false;

  for (let j = 0; j < content[i].length; j++) {
    if (isNumber(content[i][j])) {
      currentNumber = currentNumber * 10 + +content[i][j];
      if (!isPartNumber) {
        isPartNumber = hasAdjacentSymbols(i, j, content);
      }
    } else {
      if (isPartNumber) {
        sum += currentNumber;
      }
      currentNumber = 0;
      isPartNumber = false;
    }
  }
}

console.log("SUM:", sum);
