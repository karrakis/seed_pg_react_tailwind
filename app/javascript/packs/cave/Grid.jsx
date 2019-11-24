import React from "react";
import Row from "./Row";

const Grid = ({ patternData }) => {
  const cavePattern = patternData.map(p => {
    return <div className={`w-room h-full bg-gray-${p}00`} />;
  });
  return (
    <div className="flex flex-col w-container h-screen">
      <Row>{cavePattern.slice(0, 11)}</Row>
      <Row>{cavePattern.slice(11, 22)}</Row>
      <Row>{cavePattern.slice(22, 33)}</Row>
      <Row>{cavePattern.slice(33, 44)}</Row>
      <Row>{cavePattern.slice(44, 55)}</Row>
      <Row>{cavePattern.slice(55, 66)}</Row>
      <Row>{cavePattern.slice(66, 77)}</Row>
      <Row>{cavePattern.slice(77, 88)}</Row>
      <Row>{cavePattern.slice(88, 99)}</Row>
      <Row>{cavePattern.slice(99, 110)}</Row>
      <Row>{cavePattern.slice(110, 122)}</Row>
    </div>
  );
};

export default Grid;
