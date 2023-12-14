import * as fs from "fs";

const content = fs
  .readFileSync("assets/day11.txt", "utf-8")
  .split("\n")
  .filter((line) => line.length > 0);

const data = content.map((l) => l.split(""));

function printData() {
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].join(" "));
  }
}

const rowsNG = [];
const colsNG = [];

const stars: Record<string, [number, number]> = {};

for (let i = 0; i < data.length; i++) {
  let rowNG = true;
  let colNG = true;
  for (let j = 0; j < data.length; j++) {
    if (data[i][j] !== ".") {
      rowNG = false;
    }
    if (data[j][i] !== ".") {
      colNG = false;
    }
  }
  if (rowNG) rowsNG.push(i);
  if (colNG) colsNG.push(i);
}

//insert rows
let ROW = Array(data[0].length).fill(".");
for (let i = 0; i < rowsNG.length; i++) {
  data.splice(rowsNG[i] + i, 0, [...ROW]);
}

//insert columns
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < colsNG.length; j++) {
    data[i].splice(colsNG[j] + j, 0, ".");
  }
}

//label stars
let star = 0;
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] === "#") {
      star++;
      data[i][j] = star + "";
      stars[star] = [i, j];
    }
  }
}
let sum = 0;

for (let i = 1; i < star + 1; i++) {
  for (let j = i + 1; j <= star; j++) {
    const a = stars[i];
    const b = stars[j];
    let distance = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
    sum += distance;
  }
}

console.log("sum", sum);
