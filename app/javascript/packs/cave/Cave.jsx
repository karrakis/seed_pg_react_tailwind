import React from "react";
import Grid from "./Grid";

const Cave = props => {
  var data = new Array(121).fill(0);
  data[0] = 1;
  data[60] = 1;
  data[121] = 1;
  console.log(data);
  return (
    <div className="bg-black flex items-center justify-center relative">
      <Grid patternData={data} />
    </div>
  );
};

export default Cave;
