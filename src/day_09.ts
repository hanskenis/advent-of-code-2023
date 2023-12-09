const input = [];
for await (const line of console) {
  input.push(line);
}

const report = input.map((line) => line.split(" ").map((c) => Number(c)));

console.log("Part 1: " + part1(input));
console.log("Part 2: " + part2(input));

function nextValue(history: number[]): number {
  const data: number[][] = [];

  data[0] = history;

  let i = 0;

  while (data[i].some((x) => x !== 0)) {
    const differences = [];

    for (let j = 1; j < data[i].length; j++) {
      differences.push(data[i][j] - data[i][j - 1]);
    }

    i++;
    data[i] = differences;
  }

  data[i].push(0);

  for (let i = data.length - 1; i > 0; i--) {
    data[i - 1].push(data[i].at(-1)! + data[i - 1].at(-1)!);
  }

  return data[0].at(-1)!;
}

function previousValue(history: number[]): number {
  const data: number[][] = [];

  data[0] = history;

  let i = 0;

  while (data[i].some((x) => x !== 0)) {
    const differences = [];

    for (let j = 1; j < data[i].length; j++) {
      differences.push(data[i][j] - data[i][j - 1]);
    }

    i++;
    data[i] = differences;
  }

  data[i].unshift(0);

  for (let i = data.length - 1; i > 0; i--) {
    data[i - 1].push(data[i].at(-1)! + data[i - 1].at(-1)!);

    data[i - 1].unshift(data[i - 1].at(0)! - data[i].at(0)!);
  }

  return data[0][0];
}

function part1(input: string[]): number {
  return report.map((history) => nextValue(history)).reduce((a, b) => a + b, 0);
}

function part2(input: string[]): number {
  return report
    .map((history) => previousValue(history))
    .reduce((a, b) => a + b, 0);
}
