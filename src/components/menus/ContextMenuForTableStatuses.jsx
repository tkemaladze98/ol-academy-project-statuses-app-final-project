import { useEffect, useRef, useState } from "react";
import "../../styles/contextMenuForTableStatuses.scss";

const statusColors = ["white", "red", "green", "yellow"];

const ContextMenuForTableStatuses = (props) => {
  const menu = useRef();
  const [filteredColors, setFilteredColors] = useState([]);
  const changeStatusColor = (e) => {
    let tmpTable = props.table;
    tmpTable.students[props.changeProjectValue.index].projects[
      props.changeProjectValue.project
    ] = e.target.style.backgroundColor;
    props.updateStatus(tmpTable);
  };

  const handleClick = (e) => {
    if (menu.current !== null) {
      if (!menu.current.contains(e.target)) {
        props.setShowContextMenu(false);
      }
    }
  };

  useEffect(() => {
    const filterColors = statusColors.filter(
      (item) => item !== props.changeProjectValue.color
    );
    setFilteredColors(filterColors);
  }, [props.changeProjectValue.color]);
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
