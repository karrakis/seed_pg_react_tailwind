export const GRID_WIDTH = 11;
export const GRID_HEIGHT = 11;

const GROW_NODE = 3;

const newMakeTopExit = data => {
  const exit = Math.floor(Math.random() * data[0].length);
  if (exit === data[0].length) exit -= 1;
  data[0][exit] = GROW_NODE;
  return data;
};

const newMakeBotExit = data => {
  const exit = Math.floor(Math.random() * data[data.length - 1].length);
  if (exit === data[data.length - 1].length) exit -= 1;
  data[data.length - 1][exit] = GROW_NODE;
  return data;
};

const newMakeLeftExit = data => {
  const exit = Math.floor(Math.random() * data.length);
  if (exit === data.length) exit -= 1;
  data[exit][0] = GROW_NODE;
  return data;
};

const newMakeRightExit = data => {
  const exit = Math.floor(Math.random() * data.length);
  if (exit === data.length) exit -= 1;
  data[exit][data[exit].length - 1] = GROW_NODE;
  return data;
};

const newPathing = data => {
  var legal = true;
  while (legal) {
    console.log("hi!");
    data.forEach((line, y) => {
      line.forEach((room, x) => {
        // console.log(room);
        if (room === GROW_NODE) {
          //make one move
          let valid_moves = {
            right: { x: 1, y: 0 },
            left: { x: -1, y: 0 },
            up: { x: 0, y: -1 },
            down: { x: 0, y: 1 }
          };

          if (!data[y][x + 1] || data[y][x + 1] >= 0)
            delete valid_moves["right"];
          if (!data[y][x - 1] || data[y][x - 1] >= 0)
            delete valid_moves["left"];
          if (!data[y + 1] || !data[y + 1][x] || data[y + 1][x] >= 0)
            delete valid_moves["down"];
          if (!data[y - 1] || !data[y - 1][x] || data[y - 1][x] >= 0)
            delete valid_moves["up"];

          console.log("x: ", x, ", y: ", y);
          console.log(valid_moves);

          const moveSelector = Object.keys(valid_moves);
          // console.log(moveSelector);
          let selectedMoveIndex = Math.floor(
            Math.random() * moveSelector.length
          );
          if (selectedMoveIndex === moveSelector.length) selectedMoveIndex -= 1;
          // console.log(selectedMoveIndex);
          const selectedMove = moveSelector[selectedMoveIndex];
          // console.log(selectedMove);
          const moveCoordinates = valid_moves[selectedMove];

          // console.log("new Y: ", y + Number.parseInt(moveCoordinates.y));
          // console.log("new X: ", x + Number.parseInt(moveCoordinates.x));
          if (moveCoordinates) {
            data[y + Number.parseInt(moveCoordinates.y)][
              x + Number.parseInt(moveCoordinates.x)
            ] = GROW_NODE;
          }
          data[y][x] = 1;
        }
      });
    });
    //check legality
    console.log(data);
    legal =
      data.filter(line => line.filter(room => room === GROW_NODE).length !== 0)
        .length > 0;
    console.log(
      data.filter(line => line.filter(room => room === GROW_NODE).length !== 0)
        .length
    );
    data.forEach(line =>
      console.log("    ", line.filter(room => room === GROW_NODE).length)
    );
    console.log(legal);
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
    .map(n => new Array(GRID_HEIGHT).fill(-1));

  data = newMakeTopExit(data);
  data = newMakeBotExit(data);
  data = newMakeRightExit(data);
  data = newMakeLeftExit(data);

  data = newPathing(data);

  return data;
};
