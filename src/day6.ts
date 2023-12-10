import * as fs from "fs";

const content = fs
  .readFileSync("assets/input06.txt", "utf-8")
  .split("\n")
  .filter((line) => line.length > 0);

const times = content[0]
  .split(":")[1]
  .split(" ")
  .filter((c) => c.trim() !== "")
  .map((c) => +c.trim());

const distances = content[1]
  .split(":")[1]
  .split(" ")
  .filter((c) => c.trim() !== "")
  .map((c) => +c.trim());

let result = 1;

for (let i = 0; i < times.length; i++) {
  let time = times[i];
  const record = distances[i];
  let ways = 0;
  for (let speed = 0; speed < time; speed++) {
    if (speed * (time - speed) > record) {
      ways++;
    }
  }
  if (ways > 0) {
    console.log("RESULT * ", ways);
    result *= ways;
  }
}

console.log("result", result);
