const input = [];
for await (const line of console) {
  input.push(line);
}

const report = input.map((line) => line.split(" ").map((c) => Number(c)));

console.log("Part 1: " + part1(input));
console.log("Part 2: " + part2(input));

function diffs(history: number[]): number[] {
  return history.reduce((a: number[], b, i) => {
    if (i === history.length - 1) {
      return a;
    }
    return [...a, history[i + 1] - b];
  }, []);
}

function nextValue(list: number[]): number {
  if (list.every((x) => x === 0)) {
    return 0;
  }

  return list.at(-1)! + nextValue(diffs(list));
}

function part1(input: string[]): number {
  return report.map((history) => nextValue(history)).reduce((a, b) => a + b, 0);
}

function part2(input: string[]): number {
  return report
    .map((history) => nextValue(history.toReversed()))
    .reduce((a, b) => a + b, 0);
}
