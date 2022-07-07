import React, { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "../../styles/popUp.scss";

function PopUp(props) {
  const popupRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (!popupRef.current?.contains(e.target)) {
      props.closePopUp();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return function cleanUp() {
      document.removeEventListener("click", handleClick);
    };
  });

  const navigateHomePageWithoutSave = () => {
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
          <button onClick={props.createDataInDataBase}>Yes</button>
          <button onClick={navigateHomePageWithoutSave}>No</button>
        </article>
      </div>
    </div>
  );
}

export default PopUp;
