import * as fs from "fs";

const content = fs
  .readFileSync("assets/input08.txt", "utf-8")
  .split("\n")
  .filter((line) => line.length > 0);

const instructions = content[0].split("");

const graph = {};
let steps = 0;
let current = "AAA";

for (let i = 1; i < content.length; i++) {
  const parts = content[i].split("=");
  const node = parts[0].trim();
  const [L, R] = parts[1]
    .replace("(", "")
    .replace(")", "")
    .split(",")
    .map((it) => it.trim());
  graph[node] = { L, R };
}

while (true) {
  if (current === "ZZZ") {
    break;
  }
  let step = instructions[steps % instructions.length];
  current = graph[current][step];
  steps++;
}
