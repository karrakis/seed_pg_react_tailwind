import React from "react";
import Grid from "./Grid";

import { generateCave } from "../../../../lib/caveGenerator/caveGenerator";

const Cave = props => {
  var data = generateCave();
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center relative">
      <Grid patternData={data} />
    </div>
  );
};

export default Cave;
