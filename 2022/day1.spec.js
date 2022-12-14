const fs = require("fs");
const { parseInputIntoNumbersArray } = require("./common");

const puzzleInput = fs.readFileSync(__dirname + "/inputs/1.txt", {
  encoding: "utf8",
});
const sampleInput = fs.readFileSync(__dirname + "/inputs/1sample.txt", {
  encoding: "utf8",
});

const elfWithMostCalories = (food) => {
  let mostCalories = 0;
  let currentElfCalories = 0;

  food.forEach((calories, idx) => {
    if (calories === 0 || idx === food.length - 1) {
      if (currentElfCalories > mostCalories) {
        mostCalories = currentElfCalories;
      }
      currentElfCalories = 0;
    } else {
      currentElfCalories += calories;
    }
  });

  return mostCalories;
};

const topThreeElves = (food) => {
  let totalCalories = [0, 0, 0];
  let currentElfCalories = 0;

  const final = food.length;

  for (let i = 0; i < final; i++) {
    let calories = food[i];
    if (calories !== 0) {
      currentElfCalories += calories;
    }

    if (calories === 0 || i === final - 1) {
      totalCalories.push(currentElfCalories);
      currentElfCalories = 0;
    }
    totalCalories.sort((a, b) => (a > b ? -1 : 0));
    totalCalories = totalCalories.slice(0, 3);
  }

  return totalCalories.reduce((prev, next) => {
    return prev + next;
  }, 0);
};

describe("Day 1", () => {
  test("part 1 sample", () => {
    expect(
      elfWithMostCalories(parseInputIntoNumbersArray(sampleInput))
    ).toEqual(24000);
  });
  test("part 1 solve", () => {
    expect(
      elfWithMostCalories(parseInputIntoNumbersArray(puzzleInput))
    ).toEqual(70116);
  });
  test("part 2 sample", () => {
    expect(topThreeElves(parseInputIntoNumbersArray(sampleInput))).toEqual(
      45000
    );
  });
  test("part 2 solve", () => {
    expect(topThreeElves(parseInputIntoNumbersArray(puzzleInput))).toEqual(
      206582
    );
  });
});
