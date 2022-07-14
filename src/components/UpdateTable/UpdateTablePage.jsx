import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../Table/TablePage";
import TittleForm from "../FormGroups/TittleForm";
import StudentsNameForm from "../FormGroups/StudentsNameForm";
import ProjectsNameForm from "../FormGroups/ProjectsNameForm";
import ProgressBar from "../ProgressBar/ProgressBar";
import CrudServiceForTable from "../../services/CrudServiceForTable";
import TableModel from "../../models/TableModel";
import "./updateTable.scss";

const DefaultStatusColor = "white";

const UpdateTablePage = () => {
  const [students, setStudents] = useState([""]);
  const [projects, setProjects] = useState([""]);
  const [title, setTitle] = useState("");
  const [newTable, setNewTable] = useState();
  const [currentStage, setCurrentStage] = useState(1);
  const { tableKey } = useParams();

  const generateTable = (e) => {
    e.preventDefault();
    const newStudents = students.map((item, index) => {
      item = { studentName: item, projects: {} };
      projects.forEach((project) => {
        item.projects[project] =
          newTable?.students[index].projects[project] !== undefined
            ? newTable.students[index].projects[project]
            : DefaultStatusColor;
      });
      return item;
    });
    const createNewTable = new TableModel(title, projects, newStudents);
    setNewTable(createNewTable);
  };
  const currentStageIncrement = () => {
    setCurrentStage(currentStage + 1);
  };
  const currentStageDecrement = () => {
    setCurrentStage(currentStage - 1);
  };

  useEffect(() => {
    const onDataChange = (items) => {
      let tempTable = {};

      items.forEach((item) => {
        let key = item.key;
        let { title, projects, students } = item.val();
        if (key === tableKey) {
          tempTable = { key, title, projects, students };
        }
      });
      const updatedStudents = tempTable.students.map((student) => {
        return student.studentName;
      });
      setNewTable(tempTable);
      setTitle(tempTable.title);
      setProjects(tempTable.projects);
      setStudents(updatedStudents);
    };
    if (tableKey) {
      CrudServiceForTable.getAll().on("value", onDataChange);

      return () => {
        CrudServiceForTable.getAll().off("value", onDataChange);
      };
    }
  }, [tableKey]);
  return (
    <div className="table-form">
      <form>
        {currentStage === 1 && (
          <TittleForm
            title={title}
            update={true}
            setTitle={setTitle}
            currentStageIncrement={currentStageIncrement}
          />
        )}
        {currentStage === 2 && (
          <StudentsNameForm
            update={true}
            students={students}
            setStudents={setStudents}
            table={newTable}
            setNewTable={setNewTable}
            currentStageDecrement={currentStageDecrement}
            currentStageIncrement={currentStageIncrement}
          />
        )}
        {currentStage === 3 && (
          <ProjectsNameForm
            projects={projects}
            setProjects={setProjects}
            generateTable={generateTable}
            currentStageDecrement={currentStageDecrement}
            currentStageIncrement={currentStageIncrement}
          />
        )}
        {currentStage === 4 && (
          <Table
            update={true}
            currentStageDecrement={currentStageDecrement}
            table={newTable}
            setNewTable={setNewTable}
          />
        )}
      </form>
      <ProgressBar currentStage={currentStage} />
    </div>
  );
};

export default UpdateTablePage;
