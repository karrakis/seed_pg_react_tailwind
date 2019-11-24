import React from "react";
import Grid from "./Grid";

import {
  generateCave,
  GRID_WIDTH,
  GRID_HEIGHT
} from "../../../../lib/caveGenerator/caveGenerator";

const Cave = props => {
  var data = new Array(GRID_WIDTH * GRID_HEIGHT).fill(0);
  var data = generateCave(data);
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center relative">
      <Grid patternData={data} />
    </div>
  );
};

export default Cave;
