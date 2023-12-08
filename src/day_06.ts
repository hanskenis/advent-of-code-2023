const input = [];
for await (const line of console) {
  input.push(line);
}

console.log("Part 1: " + part1(input));
console.log("Part 2: " + part2(input));

function waysToWin(time: number, distance: number) {
  let disc = time * time - 4 * distance;

  const sqrt = Math.sqrt(disc);
  const x1 = (-time - sqrt) / 2;
  const x2 = (-time + sqrt) / 2;

  return Math.ceil(x2) - Math.floor(x1) - 1;
}

function part1(input: string[]): number {
  const times = input[0].split(":")[1].trim().split(/\s+/).map(Number);
  const distances = input[1].split(":")[1].trim().split(/\s+/).map(Number);

  let total = 1;
  for (let i = 0; i < times.length; i++) {
    const ways = waysToWin(times[i], distances[i]);
    total *= ways;
  }

  return total;
}

function part2(input: string[]): number {
  const time = Number(input[0].split(":")[1].trim().replace(/\s+/g, ""));
  const distance = Number(input[1].split(":")[1].trim().replace(/\s+/g, ""));

  return waysToWin(time, distance);
}
