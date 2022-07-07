import React from "react";

const TittleForm = ({ title, setTitle, currentStageIncrement }) => {
  return (
    <div className="form-group-wrapper">
      <div className="form-group">
        <label htmlFor="title">Enter table title</label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="Enter here"
          value={title}
          onChange={(e) => {
            // localStorage.setItem("current", { title: e.target.value });
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="next-button">
        <button
          disabled={title.trim().length === 0}
          onClick={currentStageIncrement}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TittleForm;
