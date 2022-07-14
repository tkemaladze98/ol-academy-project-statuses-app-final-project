import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VscCircleLargeFilled } from "react-icons/vsc";
import Swal from "sweetalert2";
import CrudServiceForTable from "../../services/CrudServiceForTable";
import ContextMenuForTableStatuses from "../Menus/ContextMenuForTableStatuses";
import PopUp from "../PopUp/PopUpPage";

import "./table.scss";
const TablePage = (props) => {
  const navigate = useNavigate();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [position, setPosition] = useState({});
  const [changeProjectValue, setChangeProjectValue] = useState();
  const [isPopUpShow, setIsPopUpShow] = useState(false);
  const { tableKey } = useParams();

  const updateStatus = (changedTable) => {
    props.setNewTable(changedTable);
    setShowContextMenu(false);
  };
  const showSuccessAlert = () => {
    Swal.fire({
      title: "Success",
      text: "Alert successful",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const createDataInDataBase = (e) => {
    e.preventDefault();
    CrudServiceForTable.create(props.table)
      .then(() => showSuccessAlert())
      .then(() => localStorage.clear())
      .then(() => navigate("/"))
      .catch((error) => console.log(error));
  };

  const updateDataInDataBase = (e) => {
    e.preventDefault();
    CrudServiceForTable.update(tableKey, props.table)
      .then(() => showSuccessAlert())
      .then(() => navigate("/"))
      .catch((error) => console.log(error));
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
                    className="circle"
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
          update={props.update}
          updateDataInDataBase={updateDataInDataBase}
          closePopUp={closePopUp}
          createDataInDataBase={createDataInDataBase}
        />
      )}
    </div>
  );
};

export default TablePage;
