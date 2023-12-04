const input = [];
for await (const line of console) {
  input.push(line);
}

type Card = {
  winningNrs: number[];
  ownNrs: number[];
};

const cards: Card[] = [];

for (const line of input) {
  const splitted = line.split(":");

  const nrs = splitted[1].split("|");

  const winningNrs = nrs[0]
    .trim()
    .split(/\s+/)
    .map((nr) => parseInt(nr));
  const ownNrs = nrs[1]
    .trim()
    .split(/\s+/)
    .map((nr) => parseInt(nr));

  cards.push({ winningNrs, ownNrs });
}

function winningNrs(card: Card): number {
  let total = 0;
  for (const nr of card.ownNrs) {
    if (card.winningNrs.includes(nr)) {
      total++;
    }
  }

  return total;
}

function part1(): number {
  let total = 0;
  for (const card of cards) {
    total += Math.floor(2 ** (winningNrs(card) - 1));
  }
  return total;
}

function part2(): number {
  const count = cards.map((_) => 1);

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    let nrCards = count[i];

    let winning = winningNrs(card);

    let index = i + 1;

    while (winning > 0) {
      count[index] += nrCards;
      winning--;
      index++;
    }
  }

  return count.reduce((acc, curr) => acc + curr, 0);
}

console.log("Part 1: " + part1());
console.log("Part 2: " + part2());
