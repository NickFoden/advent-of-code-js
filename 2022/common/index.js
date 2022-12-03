const parseInputIntoNumbersArray = (input) =>
  input.split("\n").map((i) => Number(i));

module.exports = {
  parseInputIntoNumbersArray,
};
