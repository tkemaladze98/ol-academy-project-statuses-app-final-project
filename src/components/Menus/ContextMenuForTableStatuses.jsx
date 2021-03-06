import { useEffect, useRef, useState } from "react";
import "./contextMenuForTableStatuses.scss";

const statusColors = ["white", "red", "green", "yellow"];

const ContextMenuForTableStatuses = (props) => {
  const menu = useRef();
  const [filteredColors, setFilteredColors] = useState([]);
  const changeStatusColor = (e) => {
    let tmpTable = props.table;
    tmpTable.students[props.changeProjectValue.index].projects[
      props.changeProjectValue.project
    ] = e.target.style.backgroundColor;
    let tmpStorage = JSON.stringify(tmpTable);
    localStorage.setItem("table", tmpStorage);
    localStorage.setItem("expiry", new Date().getTime() + 10 * 60 * 1000);
    props.updateStatus(tmpTable);
  };

  useEffect(() => {
    const filterColors = statusColors.filter(
      (item) => item !== props.changeProjectValue.color
    );
    setFilteredColors(filterColors);
  }, [props.changeProjectValue.color]);
  useEffect(() => {
    const handleClick = (e) => {
      if (!menu.current?.contains(e.target)) {
        props.setShowContextMenu(false);
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
  }, [props]);

  const style = {
    top: props.top,
    left: props.left,
  };
  return (
    <div ref={menu} className="menu-div" style={style}>
      {filteredColors.map((color, index) => {
        return (
          <div
            key={index}
            onClick={changeStatusColor}
            style={{ backgroundColor: color }}
          ></div>
        );
      })}
    </div>
  );
};

export default ContextMenuForTableStatuses;
