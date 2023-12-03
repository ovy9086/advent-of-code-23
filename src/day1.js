const fs = require("fs");

const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

/**
 * @param {string} source
 * @param {number} index
 */
function extractDigitMaybe(source, index) {
  for (let i = 0; i < numbers.length; i++) {
    const numberWord = numbers[i];
    if (source.slice(index, index + numberWord.length) === numberWord) {
      return i + 1;
    }
  }
  return undefined;
}

/**
 * @param {string} text
 */
function extractCalibrationValue(text) {
  const len = text.length;
  let first, last;
  for (let i = 0; i < len; i++) {
    if (first === undefined) {
      if (!isNaN(+text[i])) {
        first = +text[i];
      }
      let digitFromWord = extractDigitMaybe(text, i);
      if (digitFromWord !== undefined) {
        first = digitFromWord;
      }
    }
    if (last === undefined) {
      if (!isNaN(+text[len - 1 - i])) {
        last = +text[len - 1 - i];
      }
      let digitFromWord = extractDigitMaybe(text, len - 1 - i);
      if (digitFromWord !== undefined) {
        console.log("digit from word behind lookup", digitFromWord);
        last = digitFromWord;
      }
    }
  }

  if (first) {
    return first * 10 + last;
  }
  return 0;
}

// Specify the path to the file you want to read
const filePath = "assets/input01.txt";

// Read the entire file into a string
const fileContent = fs.readFileSync(filePath, "utf-8");

// Split the file content into an array of lines
const lines = fileContent.split("\n");

let sum = 0;

// Process each line
lines.forEach((line, index) => {
  // Process each line here
  console.log(`Line ${index + 1}: ${line}`);
  const value = extractCalibrationValue(line);
  console.log("Calibration", value);
  sum += value;
  console.log("SUM", sum);
});
