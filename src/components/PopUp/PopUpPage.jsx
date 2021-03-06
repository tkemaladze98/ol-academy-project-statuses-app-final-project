import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import "./popUp.scss";

function PopUpPage(props) {
  const popupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e) => {
      if (!popupRef.current?.contains(e.target)) {
        props.closePopUp();
      }
    };

    document.addEventListener("click", handleClick);

    return function cleanUp() {
      document.removeEventListener("click", handleClick);
    };
  }, [props]);

  const navigateHomePageWithoutSave = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="outside">
      <div className="inside" ref={popupRef}>
        <button
          className="close-btn"
          onClick={(e) => {
            e.preventDefault();
            props.closePopUp();
          }}
        >
          <AiOutlineClose />
        </button>
        <p>Are you sure you want to save?</p>
        <article className="buttons">
          <button
            onClick={
              props.update
                ? props.updateDataInDataBase
                : props.createDataInDataBase
            }
          >
            Yes
          </button>
          <button onClick={navigateHomePageWithoutSave}>No</button>
        </article>
      </div>
    </div>
  );
}

export default PopUpPage;
