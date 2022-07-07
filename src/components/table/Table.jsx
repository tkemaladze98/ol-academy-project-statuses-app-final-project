import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/table.scss";
import { VscCircleLargeFilled } from "react-icons/vsc";
import CrudServiceForTable from "../../services/CrudServiceForTable";
import ContextMenuForTableStatuses from "../menus/ContextMenuForTableStatuses";
import PopUp from "../popUp/PopUp";
const Table = (props) => {
  const navigate = useNavigate();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [position, setPosition] = useState({});
  const [changeProjectValue, setChangeProjectValue] = useState();
  const [isPopUpShow, setIsPopUpShow] = useState(false);

  const updateStatus = (changedTable) => {
    props.setNewTable(changedTable);
    setShowContextMenu(false);
  };

  const createDataInDataBase = () => {
    CrudServiceForTable.create(props.table).catch((e) => console.log(e));
    navigate("/")
  };

  const openPopUp = (e) => {
    e.preventDefault();
    setIsPopUpShow(true);
  };

  const closePopUp = () => {
    setIsPopUpShow(false);
  };

  return (
    <div className="generated-table">
      <table>
        <thead>
          <tr>
            <th>...</th>
            {props.table.students?.map((item, index) => (
              <th key={index}>{item.studentName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.table.projects?.map((project, index) => (
            <tr key={index}>
              <th>{project}</th>
              {props.table.students.map((student, i) => (
                <th key={i}>
                  <VscCircleLargeFilled
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setPosition({ top: e.pageY, left: e.pageX });
                      setShowContextMenu(true);
                      setChangeProjectValue({
                        project: project,
                        index: i,
                        color: student.projects[project],
                      });
                    }}
                    style={{ color: student.projects[project] }}
                  />
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons">
        <button onClick={props.currentStageDecrement}>Back</button>
        <button onClick={openPopUp}>Done</button>
      </div>
      {showContextMenu && (
        <ContextMenuForTableStatuses
          setShowContextMenu={setShowContextMenu}
          changeProjectValue={changeProjectValue}
          table={props.table}
          top={position.top}
          left={position.left}
          updateStatus={updateStatus}
        />
      )}
      {isPopUpShow && (
        <PopUp
          closePopUp={closePopUp}
          createDataInDataBase={createDataInDataBase}
        />
      )}
    </div>
  );
};

export default Table;
