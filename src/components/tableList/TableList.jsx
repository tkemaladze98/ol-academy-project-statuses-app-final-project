import { useEffect, useState } from "react";
import CrudServiceForTable from "../../services/CrudServiceForTable";
import "../../styles/tableList.scss";
import { VscCircleLargeFilled } from "react-icons/vsc";
import { Spinner } from "reactstrap";
import TableMenu from "../menus/TableMenu";

const TableList = () => {
  const [tables, setTables] = useState([]);
  const [showTableMenu, setShowTableMenu] = useState(false);
  const [position, setPosition] = useState({});
  const [updateTableKey, setUpdateTableKey] = useState();
  const [isEmptyTableList, setIsEmptyTableList] = useState(false);

  const onDataChange = (items) => {
    let tempTables = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      tempTables.push({
        key: key,
        title: data.title,
        projects: data.projects,
        students: data.students,
      });
    });

    setTables(tempTables);
  };
  useEffect(() => {
    CrudServiceForTable.getAll().on("value", onDataChange);

    return () => {
      CrudServiceForTable.getAll().off("value", onDataChange);
    };
  }, []);

  const showMenu = (e, table) => {
    e.preventDefault();
    setPosition({ top: e.pageY, left: e.pageX });
    setShowTableMenu(true);
    setUpdateTableKey(table.key);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsEmptyTableList(true);
    }, 5000);
  }, [tables]);

  const deleteAll = (e) => {
    e.preventDefault();
    CrudServiceForTable.deleteAll();
  };

  return (
    <div className="table-list-wrapper">
      <div className="table-list">
        {tables.length === 0 ? (
          <div className="spinner-paragraph">
            {isEmptyTableList && (
              <p className="empty-list-paragraph">Table List May be Empty</p>
            )}
            <Spinner className="spinner" animation="border" />
          </div>
        ) : (
          tables.map((table, tableIndex) => {
            return (
              <div key={tableIndex} className="table-wrapper">
                <h3>{table.title}</h3>
                <table>
                  <thead>
                    <tr>
                      <th
                        style={{ cursor: "pointer" }}
                        onClick={(e) => showMenu(e, table)}
                      >
                        ...
                      </th>
                      {table.students?.map((item, index) => (
                        <th key={index}>{item.studentName}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.projects?.map((project, index) => (
                      <tr key={index}>
                        <th>{project}</th>
                        {table.students.map((student, i) => (
                          <th key={i}>
                            <VscCircleLargeFilled
                              style={{ color: student.projects[project] }}
                            />
                          </th>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })
        )}
        {showTableMenu && (
          <TableMenu
            updateTableKey={updateTableKey}
            top={position.top}
            left={position.left}
            setShowTableMenu={setShowTableMenu}
          />
        )}
      </div>
      {tables.length !== 0 && (
        <button onClick={deleteAll} className="delete-all">
          Delete All Tables
        </button>
      )}
    </div>
  );
};

export default TableList;
