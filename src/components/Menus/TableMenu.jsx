import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/tableMenu.scss";
import CrudServiceForTable from "../../services/CrudServiceForTable";

const TableMenu = (props) => {
  const menu = useRef();
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (!menu.current?.contains(e.target)) {
      props.setShowTableMenu(false);
    }
  };

  useEffect(() => {
    if (menu !== null) {
      document.addEventListener("click", handleClick);
      document.addEventListener("contextmenu", handleClick);
    }
    return function cleanUp() {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleClick);
    };
  });

  const style = {
    top: props.top,
    left: props.left,
  };

  const goToEdit = () => {
    navigate(`/UpdateTable/${props.updateTableKey}`);
  };

  const deleteTable = () => {
    CrudServiceForTable.delete(props.updateTableKey);
    props.setShowTableMenu(false);
  };
  return (
    <div ref={menu} className="table-menu" style={style}>
      <button onClick={goToEdit} className="edit">
        Edit
      </button>
      <button onClick={deleteTable} className="delete">
        Delete
      </button>
    </div>
  );
};

export default TableMenu;
