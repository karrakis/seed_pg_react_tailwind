import React from "react";
import Row from "./Row";

const Grid = ({ patternData }) => {
  const cavePattern = patternData.map(p => {
    return <div className={`w-room h-full bg-gray-${p}00`} />;
  });
  return (
    <div className="flex flex-col w-container h-screen">
      <Row>{patternData[0]}</Row>
      <Row>{patternData[1]}</Row>
      <Row>{patternData[2]}</Row>
      <Row>{patternData[3]}</Row>
      <Row>{patternData[4]}</Row>
      <Row>{patternData[5]}</Row>
      <Row>{patternData[6]}</Row>
      <Row>{patternData[7]}</Row>
      <Row>{patternData[8]}</Row>
      <Row>{patternData[9]}</Row>
      <Row>{patternData[10]}</Row>
    </div>
  );
};

export default Grid;
