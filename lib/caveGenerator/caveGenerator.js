export const GRID_WIDTH = 11;
export const GRID_HEIGHT = 11;

const UP = -GRID_HEIGHT;
const DOWN = GRID_HEIGHT;
const LEFT = -1;
const RIGHT = 1;

const MOVE = {};
MOVE["ALL"] = [UP, DOWN, LEFT, RIGHT];

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
  while (valid_moves.length > 0 && direction === false) {
    direction = Math.floor(Math.random() * valid_moves.length);
    console.log("index: ", index);
    console.log("direction: ", direction);
    console.log("move_selected: ", valid_moves[direction]);
    if (data[index + valid_moves[direction]] > 0) {
      console.log("failed to move to index: ", index + valid_moves[direction]);
      valid_moves.splice(direction, 1);
      console.log("remaining valid moves: ", valid_moves);
      direction = false;
    } else {
      console.log("successful move to: ", index + valid_moves[direction]);
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
    let mod_data = Array.from(data);
    console.log(data.map((room, i) => room === 2 && i).filter(i => !!i));
    data.forEach((room, i) => {
      if (room === 2) {
        console.log("BEGIN");
        console.log(i);
        console.log(data);
        console.log("/BEGIN");
        let valid_moves = MOVE["ALL"];
        if (i === 0 || i % 11 === 0)
          valid_moves = valid_moves.filter(m => m !== LEFT);
        if ((i + 1) / 11 === 0)
          valid_moves = valid_moves.filter(m => m !== RIGHT);
        if (i <= 10) valid_moves = valid_moves.filter(m => m !== UP);
        if (i >= 210) valid_moves = valid_moves.filter(m => m !== DOWN);
        console.log(valid_moves);
        mod_data = grow({ valid_moves, data: mod_data, index: i });
      }
    });
    // console.log(data.filter(room => room === 2));
    data = Array.from(mod_data);
    legal = data.filter(room => room === 2).length > 0;
  }

  return data;
};

const newMakeTopExit = data => {
  const exit = Math.floor(Math.random() * data[0].length);
  if (exit === data[0].length) exit -= 1;
  data[0][exit] = 2;
  return data;
};

const newMakeBotExit = data => {
  const exit = Math.floor(Math.random() * data[data.length - 1].length);
  if (exit === data[data.length - 1].length) exit -= 1;
  data[data.length - 1][exit] = 2;
  return data;
};

const newMakeLeftExit = data => {
  const exit = Math.floor(Math.random() * data.length);
  if (exit === data.length) exit -= 1;
  data[exit][0] = 2;
  return data;
};

const newMakeRightExit = data => {
  const exit = Math.floor(Math.random() * data.length);
  if (exit === data.length) exit -= 1;
  data[exit][data[exit].length - 1] = 2;
  return data;
};

const newPathing = data => {
  var legal = true;
  while (legal) {
    console.log("hi!");
    //loop over all 2s
    data.forEach((line, y) => {
      line.forEach((room, x) => {
        console.log(room);
        if (room === 2) {
          //make one move
          let valid_moves = {
            right: { x: 1, y: 0 },
            left: { x: -1, y: 0 },
            up: { x: 0, y: -1 },
            down: { x: 0, y: 1 }
          };

          if (x === 0) {
            delete valid_moves["left"];
          }

          if (y === 0) {
            delete valid_moves["up"];
          }

          if (x === GRID_WIDTH - 1) {
            delete valid_moves["right"];
          }
          if (y === GRID_HEIGHT - 1) {
            delete valid_moves["down"];
          }
        }
      });
    });
    //check legality
    legal = false;
  }
  return data;
};

export const generateCave = data => {
  // data = makeTopExit(data);
  // data = makeRightExit(data);
  // data = makeBotExit(data);
  // data = makeLeftExit(data);
  // data = pathing(data);

  //if we initialize in fill, they all initialize to the same reference
  //and changing any changes them all.
  var data = new Array(GRID_WIDTH)
    .fill(null)
    .map(n => new Array(GRID_HEIGHT).fill(0));

  data = newMakeTopExit(data);
  data = newMakeBotExit(data);
  data = newMakeRightExit(data);
  data = newMakeLeftExit(data);

  data = newPathing(data);

  return data;
};
