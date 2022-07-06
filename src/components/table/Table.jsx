import React, { useState } from "react";
import { VscCircleLargeFilled } from "react-icons/vsc";
import ContextMenuForTableStatuses from "../menus/ContextMenuForTableStatuses";
const Table = (props) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [position,setPosition] = useState({})
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>...</th>
            {props.table.projects.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.table.students.map((student, index) => (
            <tr key={index}>
              <th>{student.studentName}</th>
              {props.table.projects.map((project, i) => (
                <th key={i}>
                  <VscCircleLargeFilled onContextMenu={(e) => {
                    e.preventDefault()
                    setPosition({top:e.pageY,left:e.pageX})
                    setShowContextMenu(true)
                  }}
                    style={{ color: student.projects[project] }}
                  />
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {showContextMenu && <ContextMenuForTableStatuses top={position.top} left={position.left}/>}
    </div>
  );
};

export default Table;
