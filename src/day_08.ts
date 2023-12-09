import lcm from "lcm";

const input: string[] = [];
for await (const line of console) {
  input.push(line);
}

const instructions = input[0];
console.log("Part 1: " + part1(input));
console.log("Part 2: " + part2(input));

type Nodes = { [node: string]: [string, string] };

function parseNodes() {
  let nodes: Nodes = {};

  for (let i = 2; i < input.length; i++) {
    const splitted = input[i].split("=");
    const node = splitted[0].trim();
    const [left, right] = splitted[1].trim().slice(1, -1).split(", ");

    nodes[node] = [left, right];
  }

  return nodes;
}

function stepsTillEnd(start: string, ending: string, nodes: Nodes) {
  let steps = 0;
  let current = start;
  let instructionIndex = 0;

  while (!current.endsWith(ending)) {
    current =
      instructions[instructionIndex] === "L"
        ? nodes[current][0]
        : nodes[current][1];

    steps++;
    instructionIndex = (instructionIndex + 1) % instructions.length;
  }
  return steps;
}

function part1(input: string[]): number {
  const nodes = parseNodes();

  let steps = 0;
  let instructionIndex = 0;
  let current = "AAA";

  while (current !== "ZZZ") {
    current =
      instructions[instructionIndex] === "L"
        ? nodes[current][0]
        : nodes[current][1];

    steps++;
    instructionIndex = (instructionIndex + 1) % instructions.length;
  }
  return steps;
}

function part2(input: string[]): number {
  const nodes = parseNodes();
  let current = Object.keys(nodes).filter((key) => key.endsWith("A"));

  const steps = current.map((start) => stepsTillEnd(start, "Z", nodes));

  return steps.reduce((acc, val) => lcm(acc, val));
}
