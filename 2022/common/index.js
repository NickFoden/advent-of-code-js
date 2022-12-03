const parseInputIntoNumbersArray = (input) =>
  input.split("\n").map((i) => Number(i));

const parseInputIntoStringArray = (input) => input.split("\n").map((i) => i);

module.exports = {
  parseInputIntoNumbersArray,
  parseInputIntoStringArray,
};
