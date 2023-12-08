import * as fs from "fs";

const content = fs
  .readFileSync("assets/input05.txt", "utf-8")
  .split("\n")
  .filter((line) => line.length > 0);

console.log("lines", content);

//Extract the first line seeds first
const seeds = content[0]
  .split("seeds: ")[1]
  .split(" ")
  .map((it) => +it.trim());

//Checks if the line is the start of a map section. eg: seed-to-soil
function mapLine(line: string) {
  return line?.includes(" map:");
}

/**
 * Each row in a 'map' section will be converted to a Mapper.
 * This mapper will keep track of the ranges that we should map, based on the file contents.
 */
class Mapper {
  name: string;
  ranges: { start: number; end: number; offset: number }[] = [];

  addRange(dest: number, source: number, len: number) {
    this.ranges.push({ start: source, end: source + len, offset: dest - source });
  }

  /**
   * Maps a number to it's corresponding mapping based on what
   * was parsed from the 'map:' input into the ranges.
   * If no mapping is found, the initial input is returned.
   */
  map(num: number): number {
    let mapped = num;
    this.ranges.forEach((range) => {
      if (range.start <= num && num <= range.end) {
        mapped = num + range.offset;
      }
    });
    return mapped;
  }
}

const mappers: Mapper[] = [];

let i = 1;
//Parse all the lines
while (i < content.length) {
  if (mapLine(content[i])) {
    //If we found a 'map:' section, parse all the ranges
    let mapper: Mapper = new Mapper();
    mapper.name = content[i].split(" map:")[0];
    i++;
    while (!mapLine(content[i]) && i < content.length) {
      let [dest, source, len] = content[i].split(" ").map((it) => +it);
      mapper.addRange(dest, source, len);
      i++;
    }
    //new maps get pushed at the end as that is the order in which they get executed
    mappers.push(mapper);
  }
}

let firstSeed = Number.MAX_VALUE;

seeds.forEach((seed) => {
  let seedMapping = seed;
  mappers.forEach((m) => {
    seedMapping = m.map(seedMapping);
  });
  firstSeed = Math.min(firstSeed, seedMapping);
});

console.log("first seed", firstSeed);
