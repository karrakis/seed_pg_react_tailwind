export const GRID_WIDTH = 11;
export const GRID_HEIGHT = 11;

const UP = -GRID_HEIGHT;
const DOWN = GRID_HEIGHT;
const LEFT = -1;
const RIGHT = 1;

const MOVE = {};
MOVE["ALL"] = [UP, DOWN, LEFT, RIGHT];
MOVE["IGNORE_LEFT"] = [UP, DOWN, RIGHT];
MOVE["IGNORE_RIGHT"] = [UP, DOWN, LEFT];
MOVE["IGNORE_UP"] = [DOWN, LEFT, RIGHT];
MOVE["IGNORE_DOWN"] = [UP, LEFT, RIGHT];

const randInRow = () => {
  return Math.floor(Math.random() * GRID_WIDTH);
};

const randInCol = () => {
  // 11 * 11 is 121 which is the highest
  return Math.floor(Math.random() * GRID_HEIGHT);
};

const makeRightExit = data => {
  data[GRID_WIDTH * randInCol() + 10] = 2;
  return data;
};

const makeLeftExit = data => {
  data[GRID_WIDTH * randInCol()] = 2;
  return data;
};

const makeTopExit = data => {
  data[randInRow()] = 2;
  return data;
};

const makeBotExit = data => {
  data[randInRow() + (GRID_HEIGHT * GRID_WIDTH - GRID_WIDTH)] = 2;
  return data;
};

const grow = ({ valid_moves, data, index }) => {
  let direction = false;
  while (valid_moves.length > 0 && !direction) {
    direction = Math.floor(Math.random() * valid_moves.length);
    if (data[index + valid_moves[direction]] > 0) {
      valid_moves.splice(direction, 1);
      direction = false;
    } else {
      data[index + valid_moves[direction]] = 2;
      data[index] = 1;
    }
  }
  if (valid_moves.length === 0) {
    console.log("terminus point reached");
    data[index] = 1;
  }
  return data;
};

const pathing = data => {
  //paths should continue until they find themselves with nowhere legal to go, this should only be possible once they connect to their sibling paths
  var legal = true;
  while (legal) {
    console.log(data.filter(room => room === 2));
    let mod_data = Array.from(data);
    data.forEach((room, i) => {
      if (room === 2) {
        let valid_moves = MOVE["ALL"];
        if (i / 11 === 0 || i / 11 === 1)
          valid_moves = valid_moves.filter(m => m !== LEFT);
        if ((i + 1) / 11 === 0)
          valid_moves = valid_moves.filter(m => m !== RIGHT);
        if (i <= 10) valid_moves = valid_moves.filter(m => m !== UP);
        if (i >= 210) valid_moves = valid_moves.filter(m => m !== DOWN);
        console.log(valid_moves);
        mod_data = grow({ valid_moves, data: mod_data, index: i });
        console.log("equivalency checK: ", mod_data === data);
      }
    });
    // console.log(data.filter(room => room === 2));
    data = Array.from(mod_data);
    legal = data.filter(room => room === 2).length > 0;
  }

  return data;
};

export const generateCave = data => {
  data = makeTopExit(data);
  data = makeRightExit(data);
  data = makeBotExit(data);
  data = makeLeftExit(data);
  data = pathing(data);
  return data;
};
