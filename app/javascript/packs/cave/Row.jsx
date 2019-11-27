import React from "react";

const Row = ({ children }) => {
  const cavePattern = children.map(p => {
    return <div className={`w-room h-full bg-gray-${p}00`} />;
  });
  return <div className="flex flex-row h-room">{cavePattern}</div>;
};

export default Row;
