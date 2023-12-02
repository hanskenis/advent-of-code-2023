import { parse } from "url";

const input = [];
for await (const line of console) {
  input.push(line);
}

console.log("Part 1: " + part1(input));
console.log("Part 2: " + part2(input));

function parseCalibrationValue(line: string) {
  let left = 0;
  let right = 0;

  for (const char of line) {
    left = parseInt(char);
    if (!isNaN(left)) {
      break;
    }
  }
  for (let i = line.length - 1; i >= 0; i--) {
    right = parseInt(line[i]);
    if (!isNaN(right)) {
      break;
    }
  }

  return parseInt(left.toString() + right.toString());
}

function part1(input: string[]): number {
  let total = 0;

  for (const line of input) {
    total += parseCalibrationValue(line);
  }

  return total;
}

function replaceNumbers(line: string) {
  let newLine = line.replaceAll("one", "o1e");
  newLine = newLine.replaceAll("two", "t2o");
  newLine = newLine.replaceAll("three", "t3e");
  newLine = newLine.replaceAll("four", "f4r");
  newLine = newLine.replaceAll("five", "f5e");
  newLine = newLine.replaceAll("six", "s6x");
  newLine = newLine.replaceAll("seven", "s7n");
  newLine = newLine.replaceAll("eight", "e8t");
  newLine = newLine.replaceAll("nine", "n9e");

  return newLine;
}

function part2(input: string[]): number {
  let total = 0;

  for (const line of input) {
    let newLine = replaceNumbers(line);

    total += parseCalibrationValue(newLine);

    console.log(
      line + " - " + newLine + " - " + parseCalibrationValue(newLine)
    );
  }

  return total;
}
