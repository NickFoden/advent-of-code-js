const fs = require("fs");
const puzzleInput = fs.readFileSync(__dirname + "/inputs/day1.txt", {
  encoding: "utf8",
});
const sampleInput = fs.readFileSync(__dirname + "/inputs/day1sample.txt", {
  encoding: "utf8",
});

const parseInputIntoArray = (input) => input.split("\n").map((i) => Number(i));

const calculateNumberOfDepthIncreases = (inputDepths) => {
  let count = 0;
  let current = 0;

  inputDepths.forEach((depth, idx) => {
    if (depth > current && idx !== 0) {
      count++;
    }
    current = depth;
  });

  return count;
};

const calculateWindowNumberOfDepthIncreases = (inputDepths) => {
  const slidingWindows = [];

  for (let i = 0; i < inputDepths.length - 2; i++) {
    const newWindow = inputDepths[i] + inputDepths[i + 1] + inputDepths[i + 2];
    slidingWindows.push(newWindow);
  }

  let count = 0;
  let current = 0;

  slidingWindows.forEach((depth, idx) => {
    if (depth > current && idx !== 0) {
      count++;
    }
    current = depth;
  });

  return count;
};

describe("Day 1", () => {
  test("Part 1 Sample", () => {
    expect(
      calculateNumberOfDepthIncreases(parseInputIntoArray(sampleInput))
    ).toEqual(7);
  });
  test("Part 1 Solve", () => {
    expect(
      calculateNumberOfDepthIncreases(parseInputIntoArray(puzzleInput))
    ).toEqual(1722);
  });
  test("Part 2 Sample", () => {
    expect(
      calculateWindowNumberOfDepthIncreases(parseInputIntoArray(sampleInput))
    ).toEqual(5);
  });
  test("Part 2 Solve", () => {
    expect(
      calculateWindowNumberOfDepthIncreases(parseInputIntoArray(puzzleInput))
    ).toEqual(1748);
  });
});
