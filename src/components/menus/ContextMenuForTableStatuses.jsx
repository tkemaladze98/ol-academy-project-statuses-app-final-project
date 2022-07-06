import React from "react";

const ContextMenuForTableStatuses = (props) => {
  return (
    <div
      style={{
        width: "40px",
        position: "absolute",
        top: props.top,
        left: props.left,
      }}
    >
      <div
        style={{ width: "100%", height: "20px", backgroundColor: "red" }}
      ></div>
      <div
        style={{ width: "100%", height: "20px", backgroundColor: "green" }}
      ></div>
      <div
        style={{ width: "100%", height: "20px", backgroundColor: "white" }}
      ></div>
      <div
        style={{ width: "100%", height: "20px", backgroundColor: "blue" }}
      ></div>
    </div>
  );
};

export default ContextMenuForTableStatuses;
