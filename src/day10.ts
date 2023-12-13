import * as fs from "fs";

const content = fs
  .readFileSync("assets/day10.txt", "utf-8")
  .split("\n")
  .filter((line) => line.length > 0);

let map = content.map((it) => it.split(""));

//x, y
const directions = {
  "|": [
    [0, -1],
    [0, 1],
  ],
  "-": [
    [-1, 0],
    [1, 0],
  ],
  L: [
    [0, -1],
    [1, 0],
  ],
  "7": [
    [0, 1],
    [-1, 0],
  ],
  J: [
    [0, -1],
    [-1, 0],
  ],
  F: [
    [1, 0],
    [0, 1],
  ],
} as const;

type Pipe = keyof typeof directions;

function findStartPosition(): [number, number] {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "S") {
        return [i, j];
      }
    }
  }
  throw Error();
}

function findStartPipePosition(): [number, number] {
  const [ii, jj] = findStartPosition();
  console.log("START POSITION", ii, jj);
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (Math.abs(i) + Math.abs(j) === 2) {
        continue;
      }
      if (Object.keys(directions).includes(map[ii + i]?.[jj + j])) {
        console.log("found pipe", i, j, map[ii + i]?.[jj + j]);
        return [ii + i, jj + j];
      } else {
        console.log("not pipe", i, j, map[ii + i]?.[jj + j]);
      }
    }
  }
  return [0, 0];
}

let [i, j] = findStartPipePosition();

let steps = 0;
let current = map[i][j];

while (current !== "S") {
  const next = directions[current];
  steps++;
  map[i][j] = "X";
  const nextAttempt = map[i + next[0][1]]?.[j + next[0][0]];
  if (nextAttempt !== "." && nextAttempt !== "X" && !(nextAttempt === "S" && steps === 1)) {
    i = i + next[0][1];
    j = j + next[0][0];
  } else {
    i = i + next[1][1];
    j = j + next[1][0];
  }
  current = map[i][j];
  console.log("new current", current);
  //   console.log(map);
}

console.log("total steps=", steps);
console.log("result=", (steps + 1) / 2);
