const fs = require("fs");
const { parseInputIntoStringArray } = require("./common");

const puzzleInput = fs.readFileSync(__dirname + "/inputs/2.txt", {
  encoding: "utf8",
});
const sampleInput = fs.readFileSync(__dirname + "/inputs/2sample.txt", {
  encoding: "utf8",
});

const ROCK = "Rock";
const PAPER = "Paper";
const SCISSORS = "Scissors";

const WIN = "Win";
const DRAW = "Draw";
const LOST = "Lose";

const calculatePointsForChoice = (p) => {
  switch (p) {
    case ROCK:
      return 1;
    case PAPER:
      return 2;
    case SCISSORS:
      return 3;
  }
  return 0;
};

const calculateMove = (g) => {
  switch (g) {
    case "A":
    case "X": {
      return ROCK;
    }
    case "B":
    case "Y": {
      return PAPER;
    }
    case "C":
    case "Z": {
      return SCISSORS;
    }
  }
  return "";
};

const calculateScore = (p1, p2) => {
  let score = 0;
  let pointsForPlayer2Choice = calculatePointsForChoice(p2);
  score = score + pointsForPlayer2Choice;

  if (p1 === p2) {
    // 3 points for a draw
    score += 3;
  } else if (
    (p1 === ROCK && p2 === SCISSORS) ||
    (p1 === PAPER && p2 === ROCK) ||
    (p1 === SCISSORS && p2 === PAPER)
  ) {
    // 0 points for a loss
  } else {
    // 6 points for a win
    score += 6;
  }

  return score;
};

const rockPapersStrategy = (games) => {
  let total = 0;

  games.forEach((g) => {
    const match = g.split(" ");
    const p1 = calculateMove(match[0]);
    const p2 = calculateMove(match[1]);
    const matchScore = calculateScore(p1, p2);
    total = total + matchScore;
  });

  return total;
};

const determineOutcome = (o) => {
  switch (o) {
    case "X":
      return LOST;
    case "Y":
      return DRAW;
    case "Z":
      return WIN;
  }
  return "";
};

const calculateMoveWithOutcome = (p1, out) => {
  if (out === DRAW) {
    return p1;
  }

  if (p1 === ROCK) {
    if (out === WIN) {
      return PAPER;
    } else {
      return SCISSORS;
    }
  }
  if (p1 === PAPER) {
    if (out === WIN) {
      return SCISSORS;
    } else {
      return ROCK;
    }
  }
  if (p1 === SCISSORS) {
    if (out === WIN) {
      return ROCK;
    } else {
      return PAPER;
    }
  }
  return "";
};

const rockPapersStrategyWithLegend = (games) => {
  let total = 0;

  games.forEach((g) => {
    const match = g.split(" ");
    const p1 = calculateMove(match[0]);
    const outcome = determineOutcome(match[1]);
    const p2 = calculateMoveWithOutcome(p1, outcome);
    const matchScore = calculateScore(p1, p2);
    total = total + matchScore;
  });

  return total;
};

describe("Day 1", () => {
  test("part 1 sample", () => {
    expect(rockPapersStrategy(parseInputIntoStringArray(sampleInput))).toEqual(
      15
    );
  });
  test("part 1 solve", () => {
    expect(rockPapersStrategy(parseInputIntoStringArray(puzzleInput))).toEqual(
      10816
    );
  });
  test("part 2 sample", () => {
    expect(
      rockPapersStrategyWithLegend(parseInputIntoStringArray(sampleInput))
    ).toEqual(12);
  });
  // test("part 2 solve", () => {
  //   expect(rockPapersStrategy(parseInputIntoNumbersArray(sampleInput))).toEqual(
  //     15
  //   );
  // });
});
