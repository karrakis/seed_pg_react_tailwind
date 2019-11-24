import React from "react";
import Grid from "./Grid";

const GRID_WIDTH = 11;
const GRID_HEIGHT = 11;

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

const generateCaves = data => {
  data = makeTopExit(data);
  data = makeRightExit(data);
  data = makeBotExit(data);
  data = makeLeftExit(data);
  return data;
};

const Cave = props => {
  var data = new Array(GRID_WIDTH * GRID_HEIGHT).fill(0);
  var data = generateCaves(data);
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center relative">
      <Grid patternData={data} />
    </div>
  );
};

export default Cave;
