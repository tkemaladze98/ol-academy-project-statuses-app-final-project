import setExpiryTime from "../../utils/getExpiryTime";
const TittleForm = ({ title, setTitle, currentStageIncrement, update }) => {
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
            if (!update) {
              localStorage.setItem("title", e.target.value);
              setExpiryTime();
            }
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
