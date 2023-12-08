const input = [];
for await (const line of console) {
  input.push(line);
}

console.log("Part 1: " + part1(input));
console.log("Part 2: " + part2(input));

function typeValue(hand: string, joker: boolean): number {
  let cards: { [card: string]: number } = {};

  for (const c of hand) {
    if (!cards[c]) {
      cards[c] = 0;
    }
    cards[c]++;
  }

  if (joker && cards["J"] && Object.keys(cards).length > 1) {
    const amount = cards["J"];
    delete cards["J"];
    const entries = Object.entries(cards).sort((a, b) => b[1] - a[1]);
    cards[entries[0][0]] += amount;
  }

  switch (Object.keys(cards).length) {
    case 1:
      return 6;
    case 2:
      if (Object.values(cards).includes(4)) {
        return 5;
      } else {
        return 4;
      }
    case 3:
      if (Object.values(cards).includes(3)) {
        return 3;
      } else {
        return 2;
      }
    case 4:
      return 1;
  }
  return 0;
}

function cardValue1(card: string, joker: boolean): number {
  switch (card) {
    case "A":
      return 14;
    case "K":
      return 13;
    case "Q":
      return 12;
    case "J":
      return joker ? 1 : 11;
    case "T":
      return 10;
    default:
      return Number(card);
  }
}

function compareSameType(hand1: string, hand2: string, joker: boolean) {
  for (let i = 0; i < hand1.length; i++) {
    if (hand1[i] === hand2[i]) {
      continue;
    } else {
      return cardValue1(hand1[i], joker) - cardValue1(hand2[i], joker);
    }
  }

  return 0;
}

function compare(hand1: string, hand2: string, joker: boolean) {
  const typeDiff = typeValue(hand1, joker) - typeValue(hand2, joker);

  return typeDiff !== 0 ? typeDiff : compareSameType(hand1, hand2, joker);
}

function part1(input: string[]): number {
  const splitted = input.map((line) => line.split(" "));

  splitted.sort((a, b) => compare(a[0], b[0], false));

  return splitted
    .map((line, index) => Number(line[1]) * (index + 1))

    .reduce((a, b) => a + b, 0);
}

function part2(input: string[]): number {
  const splitted = input.map((line) => line.split(" "));

  splitted.sort((a, b) => compare(a[0], b[0], true));

  return splitted
    .map((line, index) => Number(line[1]) * (index + 1))
    .reduce((a, b) => a + b, 0);
}
