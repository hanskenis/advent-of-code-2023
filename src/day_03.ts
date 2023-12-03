import { Hash } from "crypto";

const input: string[] = [];
const neighbours = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [1, 1],
  [-1, 1],
  [1, -1],
];

for await (const line of console) {
  input.push(line);
}

console.log("Part 1: " + part1(input));
console.log("Part 2: " + part2(input));

function isNumber(value: string): boolean {
  return !isNaN(Number(value));
}

function isSymbol(value: string): boolean {
  return !isNumber(value) && value !== ".";
}

function hasAdjascentSymbol(i: number, j: number): boolean {
  for (const neighbour of neighbours) {
    const x = i + neighbour[0];
    const y = j + neighbour[1];

    if (x < 0 || x >= input.length || y < 0 || y >= input[i].length) {
      continue;
    }

    if (isSymbol(input[x][y])) {
      return true;
    }
  }

  return false;
}

function getAdjacentStarsForCell(i: number, j: number) {
  const stars = new Set<{ x: number; y: number }>();

  for (const neighbour of neighbours) {
    const x = i + neighbour[0];
    const y = j + neighbour[1];

    if (x < 0 || x >= input.length || y < 0 || y >= input[i].length) {
      continue;
    }

    if (input[x][y] === "*") {
      stars.add({ x, y });
    }
  }

  return stars;
}

function getAdjacentStars(i: number, start: number, end: number) {
  const stars = new Set<string>();

  for (let j = start; j < end; j++) {
    const cellStars = getAdjacentStarsForCell(i, j);
    for (const star of cellStars) {
      stars.add(star.x + "," + star.y);
    }
  }

  return stars;
}

function isPart(i: number, start: number, end: number): boolean {
  for (let j = start; j < end; j++) {
    if (hasAdjascentSymbol(i, j)) {
      return true;
    }
  }

  return false;
}

function part1(input: string[]): number {
  let total = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (isNumber(input[i][j])) {
        const start = j;
        while (isNumber(input[i][j])) {
          j++;
        }

        const num = Number(input[i].substring(start, j));

        if (isPart(i, start, j)) {
          total += num;
        }
      }
    }
  }

  return total;
}

function part2(input: string[]): number {
  let stars: { [star: string]: number[] } = {};

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (isNumber(input[i][j])) {
        const start = j;
        while (isNumber(input[i][j])) {
          j++;
        }

        const num = Number(input[i].substring(start, j));
        const adjecentStars = getAdjacentStars(i, start, j);

        for (const star of adjecentStars) {
          if (!stars[star]) {
            stars[star] = [];
          }

          stars[star].push(num);
        }
      }
    }
  }

  let total = 0;

  for (const star in stars) {
    if (stars[star].length === 2) {
      total += stars[star][0] * stars[star][1];
    }
  }

  return total;
}
