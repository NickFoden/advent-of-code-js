const fs = require("fs");
const { parseInputIntoStringArray } = require("./common");

const puzzleInput = fs.readFileSync(__dirname + "/inputs/3.txt", {
  encoding: "utf8",
});
const sampleInput = fs.readFileSync(__dirname + "/inputs/3sample.txt", {
  encoding: "utf8",
});

const determinePriority = (item) => {
  let result = 0;
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  alphabet.every((alpha, idx) => {
    if (item === alpha) {
      result = idx + 1;
      return false;
    } else if (item === alpha.toUpperCase()) {
      result = idx + 1 + 26;
      return false;
    }
    return true;
  });
  return result;
};

const ruckSackPriority = (packs) => {
  let total = 0;

  packs.forEach((pack) => {
    const half = pack.length / 2;
    const firstCompartment = pack.slice(0, half);
    const secondCompartment = pack.slice(half, pack.length);
    const duplicates = [];

    firstCompartment.split("").forEach((letter) => {
      if (secondCompartment.includes(letter) && !duplicates.includes(letter)) {
        duplicates.push(letter);
      }
    });

    duplicates.forEach((l) => {
      const val = determinePriority(l);
      total += val;
    });
  });

  return total;
};

const ruckSackBadges = (packs) => {
  let result = 0;
  let currentGroup = [];
  let currentDuplicates = [];

  for (let i = 0; i < packs.length; i++) {
    currentGroup.push(packs[i]);

    if (i % 3 === 2) {
      currentGroup[0].split("").forEach((letter) => {
        if (
          currentGroup[1].includes(letter) &&
          currentGroup[2].includes(letter) &&
          !currentDuplicates.includes(letter)
        ) {
          currentDuplicates.push(letter);
        }
      });

      result += determinePriority(currentDuplicates[0]);

      currentDuplicates = [];
      currentGroup = [];
    }
  }

  return result;
};

describe("Day 3", () => {
  test("part 1 sample", () => {
    expect(ruckSackPriority(parseInputIntoStringArray(sampleInput))).toEqual(
      157
    );
  });
  test("part 1 solve", () => {
    expect(ruckSackPriority(parseInputIntoStringArray(puzzleInput))).toEqual(
      8252
    );
  });
  test("part 2 sample", () => {
    expect(ruckSackBadges(parseInputIntoStringArray(sampleInput))).toEqual(70);
  });
  test("part 2 solve", () => {
    expect(ruckSackBadges(parseInputIntoStringArray(puzzleInput))).toEqual(
      2828
    );
  });
});
