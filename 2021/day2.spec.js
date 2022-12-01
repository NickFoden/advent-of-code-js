const fs = require("fs");
const puzzleInput = fs.readFileSync(__dirname + "/inputs/day2.txt", {
  encoding: "utf8",
});
const sampleInput = fs.readFileSync(__dirname + "/inputs/day2sample.txt", {
  encoding: "utf8",
});

const parseInputIntoArray = (input) =>
  input.split("\n").map((i) => i.split(" "));

const calculateDistance = (data) => {
  let horizontal = 0;
  let depth = 0;

  data.forEach((d) => {
    const [verb, value] = d;
    switch (verb.trim()) {
      case "forward":
        horizontal = horizontal + Number(value);
        return;
      case "down":
        depth = depth + Number(value);
        return;
      case "up":
        depth = depth - Number(value);
        return;
    }
  });
  return horizontal * depth;
};

const calculateDistanceWithAim = (data) => {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  data.forEach((d) => {
    const [verb, value] = d;
    switch (verb.trim()) {
      case "forward":
        horizontal = horizontal + Number(value);
        if (aim !== 0) {
          depth = depth + aim * Number(value);
        }
        return;
      case "down":
        aim = aim + Number(value);
        return;
      case "up":
        aim = aim - Number(value);
        return;
    }
  });
  return horizontal * depth;
};

describe("Day 2", () => {
  test("Part 1 Sample", () => {
    expect(calculateDistance(parseInputIntoArray(sampleInput))).toEqual(150);
  });
  test("Part 1 Solve", () => {
    expect(calculateDistance(parseInputIntoArray(puzzleInput))).toEqual(
      1561344
    );
  });
  test("Part 2 Sample", () => {
    expect(calculateDistanceWithAim(parseInputIntoArray(sampleInput))).toEqual(
      900
    );
  });
  test("Part 2 Solve", () => {
    expect(calculateDistanceWithAim(parseInputIntoArray(puzzleInput))).toEqual(
      1848454425
    );
  });
});
