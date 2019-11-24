export const GRID_WIDTH = 11;
export const GRID_HEIGHT = 11;

const UP = -11;
const DOWN = 11;
const LEFT = -1;
const RIGHT = 1;

const randInRow = () => {
  return Math.floor(Math.random() * GRID_WIDTH);
};

const randInCol = () => {
  // 11 * 11 is 121 which is the highest
  return Math.floor(Math.random() * GRID_HEIGHT);
};

const makeRightExit = data => {
  data[GRID_WIDTH * randInCol() + 10] = 1;
  return data;
};

const makeLeftExit = data => {
  data[GRID_WIDTH * randInCol()] = 1;
  return data;
};

const makeTopExit = data => {
  data[randInRow()] = 1;
  return data;
};

const makeBotExit = data => {
  data[randInRow() + (GRID_HEIGHT * GRID_WIDTH - GRID_WIDTH)] = 1;
  return data;
};

const recursivePathing = data => {
  data.forEach((room, i) => {
    if (i / 11 <= 1) {
      //ignore LEFT
    } else if ((i + 10) / 11 <= 1) {
      //ignore RIGHT
    } else if (i <= 10) {
      //ignore UP
    } else if (i >= 210) {
      //ignore DOWN
    } else {
      //any direction that isn't already set to 1
    }
  });
  return data;
};

export const generateCave = data => {
  data = makeTopExit(data);
  data = makeRightExit(data);
  data = makeBotExit(data);
  data = makeLeftExit(data);
  data = recursivePathing(data);
  return data;
};
