import * as fs from "fs";

const content = fs
  .readFileSync("assets/input9.txt", "utf-8")
  .split("\n")
  .filter((line) => line.length > 0);

function allZeroes(arr: number[]) {
  return arr.every((it) => it === 0);
}

function calculatePrediction(data: number[]) {
  if (allZeroes(data)) {
    return 0;
  }
  let diffs: number[] = [];
  for (let i = 0; i < data.length - 1; i++) {
    diffs.push(data[i + 1] - data[i]);
  }
  return data[data.length - 1] + calculatePrediction(diffs);
}

const lineToNums = (line: string) => line.split(" ").map((i) => +i);

const sum = content.reduce((prev, curr) => prev + calculatePrediction(lineToNums(curr)), 0);

console.log("SUM=", sum);
