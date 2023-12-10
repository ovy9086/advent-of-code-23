import * as fs from "fs";

const content = fs
  .readFileSync("assets/input07.txt", "utf-8")
  .split("\n")
  .filter((line) => line.length > 0);

const cardsRank = {
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

function mapHand(hand: string) {
  const map = {};
  hand.split("").forEach((card) => {
    if (map[card]) {
      map[card]++;
    } else {
      map[card] = 1;
    }
  });
  const power = Object.values(map).join("");
  if (power.includes("5")) {
    return 5;
  } else if (power.includes("4")) {
    return 4;
  } else if (power.includes("3") && power.includes("2")) {
    return 3;
  } else if (power.includes("3")) {
    return 2;
  } else if (power.includes("22") || power.includes("212")) {
    return 1;
  } else if (power.includes("2")) {
    return 0.5;
  } else {
    return 0;
  }
}

const sortedHands = content
  .map((line) => {
    const parts = line.split(" ");
    return {
      bid: +parts[1],
      hand: parts[0],
      power: mapHand(parts[0]),
    };
  })
  .sort((a, b) => {
    if (a.power === b.power) {
      for (let i = 0; i < 5; i++) {
        let av = isNaN(+a.hand[i]) ? cardsRank[a.hand[i]] : +a.hand[i];
        let bv = isNaN(+b.hand[i]) ? cardsRank[b.hand[i]] : +b.hand[i];
        if (av === bv) {
          continue;
        } else {
          return av - bv;
        }
      }
    }
    return a.power - b.power;
  });

let sum = 0;

sortedHands.map((h, i) => {
  sum += (i + 1) * h.bid;
});

console.log("SUM", sum);
