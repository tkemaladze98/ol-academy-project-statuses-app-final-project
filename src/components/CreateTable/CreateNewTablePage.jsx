import { useEffect, useState } from "react";
import Table from "../Table/TablePage";
import TittleForm from "../FormGroups/TittleForm";
import StudentsNameForm from "../FormGroups/StudentsNameForm";
import ProjectsNameForm from "../FormGroups/ProjectsNameForm";
import ProgressBar from "../ProgressBar/ProgressBar";
import TableModel from "../../models/TableModel";
import "./createNewTable.scss";

const DefaultStatusColor = "white";

const CreateNewTablePage = () => {
  const [students, setStudents] = useState([""]);
  const [projects, setProjects] = useState([""]);
  const [title, setTitle] = useState("");
  const [newTable, setNewTable] = useState();
  const [currentStage, setCurrentStage] = useState(1);

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
    const now = new Date().getTime();
    if (localStorage.getItem("expiry") < now) {
      localStorage.clear();
    }
    if (localStorage.getItem("title") !== null) {
      setTitle(localStorage.getItem("title"));
    }
    if (localStorage.getItem("students") !== null) {
      setStudents(JSON.parse(localStorage.getItem("students")));
    }
    if (localStorage.getItem("projects") !== null) {
      setProjects(JSON.parse(localStorage.getItem("projects")));
    }
    if (localStorage.getItem("table") !== null) {
      setNewTable(JSON.parse(localStorage.getItem("table")));
    }
  }, []);

  return (
    <div className="table-form">
      <form>
        {currentStage === 1 && (
          <TittleForm
            update={false}
            title={title}
            setTitle={setTitle}
            currentStageIncrement={currentStageIncrement}
          />
        )}
        {currentStage === 2 && (
          <StudentsNameForm
            update={false}
            students={students}
            setStudents={setStudents}
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
            update={false}
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

export default CreateNewTablePage;
