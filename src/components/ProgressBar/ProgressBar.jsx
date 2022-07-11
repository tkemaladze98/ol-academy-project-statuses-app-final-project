import React from "react";
import "../../styles/progressBar.scss";

const ProgressBar = (props) => {
  const style = {
    width: `${(props.currentStage / 4) * 100}%`,
  };
  return (
    <div className="outside-progress">
      <div className="progress-bar" style={style}></div>
    </div>
  );
};

export default ProgressBar;
