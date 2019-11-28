import React from "react";
import Row from "./Row";

const Grid = ({ patternData }) => {
  const rows = patternData.map(
    row => <Row>{row}</Row> //your boat
  );
  return (
    <div className="flex flex-col w-container h-screen bg-black">{rows}</div>
  );
};

export default Grid;
