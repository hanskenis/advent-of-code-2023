const input = [];
for await (const line of console) {
  input.push(line);
}

console.log("Part 1: " + part1(input));
console.log("Part 2: " + part2(input));

type Set = {
  blue: number;
  red: number;
  green: number;
};

type Game = {
  id: number;
  sets: Set[];
};

function parseGame(line: string): Game {
  const splitted = line.split(":");

  const game: Game = {
    id: parseInt(splitted[0].split(" ")[1]),
    sets: [],
  };

  const sets = splitted[1].split(";");

  for (let index = 0; index < sets.length; index++) {
    game.sets.push({ blue: 0, red: 0, green: 0 });

    const set = sets[index];

    const colors = set.split(", ");

    for (const color of colors) {
      const splittedColor = color.trim().split(" ");

      const colorName = splittedColor[1].trim();
      const colorValue = parseInt(splittedColor[0].trim());

      switch (colorName) {
        case "blue":
          game.sets[index].blue = colorValue;
          break;
        case "red":
          game.sets[index].red = colorValue;
          break;
        case "green":
          game.sets[index].green = colorValue;
          break;
      }
    }
  }

  return game;
}

function parseGames(input: string[]): Game[] {
  const games: Game[] = [];

  for (const line of input) {
    games.push(parseGame(line));
  }

  return games;
}

function isPossible(
  game: Game,
  red: number,
  green: number,
  blue: number
): boolean {
  for (const set of game.sets) {
    if (set.red > red || set.green > green || set.blue > blue) {
      return false;
    }
  }

  return true;
}

function fewestNrCubes(game: Game): {
  red: number;
  green: number;
  blue: number;
} {
  let red = Math.max(...game.sets.map((set) => set.red));
  let green = Math.max(...game.sets.map((set) => set.green));
  let blue = Math.max(...game.sets.map((set) => set.blue));

  return { red, green, blue };
}

function part1(input: string[]): number {
  const games = parseGames(input);
  const result = games.filter((game) => isPossible(game, 12, 13, 14));

  return result.reduce((acc, game) => acc + game.id, 0);
}

function part2(input: string[]): number {
  const games = parseGames(input);

  return games
    .map((games) => fewestNrCubes(games))
    .reduce((acc, game) => acc + game.red * game.green * game.blue, 0);
}
