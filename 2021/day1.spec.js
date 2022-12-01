const sampleInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

const checkIncrements = (data) => {
  let result = 0;
  let iterator = null;

  data.forEach((i) => {
    if (iterator === null) {
      iterator = Number(i);
    } else {
      if (Number(i) > iterator) {
        result++;
      }
      iterator = Number(i);
    }
  });

  return result;
};

describe("Day 1", () => {
  test("Sample", () => {
    expect(checkIncrements(sampleInput)).toEqual(7);
  });
});
