import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CrudServiceForTable from "../../services/CrudServiceForTable";
import "./tableMenu.scss";

const TableMenu = ({ setShowTableMenu, top, left, updateTableKey }) => {
  const menu = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e) => {
      if (!menu.current?.contains(e.target)) {
        setShowTableMenu(false);
      }
    };
    if (menu !== null) {
      document.addEventListener("click", handleClick);
      document.addEventListener("contextmenu", handleClick);
    }
    return function cleanUp() {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleClick);
    };
  }, [setShowTableMenu]);

  const style = {
    top: top,
    left: left,
  };

  const goToEdit = () => {
    navigate(`/UpdateTable/${updateTableKey}`);
  };

  const deleteTable = () => {
    CrudServiceForTable.delete(updateTableKey);
    setShowTableMenu(false);
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
