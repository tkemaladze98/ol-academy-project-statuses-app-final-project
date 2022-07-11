import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/createNewTable.scss";
import TableModel from "../../models/TableModel";
import Table from "../Table/Table";
import TittleForm from "../FormGroups/TittleForm";
import StudentsNameForm from "../FormGroups/StudentsNameForm";
import ProjectsNameForm from "../FormGroups/ProjectsNameForm";
import ProgressBar from "../ProgressBar/ProgressBar";
import CrudServiceForTable from "../../services/CrudServiceForTable";

const CreateNewTable = (props) => {
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
            : "white";
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

  const onDataChange = (items) => {
    let tempTable = {};

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      if (key === tableKey) {
        tempTable = {
          key: key,
          title: data.title,
          projects: data.projects,
          students: data.students,
        };
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

  useEffect(() => {
    if (tableKey) {
      CrudServiceForTable.getAll().on("value", onDataChange);

      return () => {
        CrudServiceForTable.getAll().off("value", onDataChange);
      };
    }
<<<<<<< Updated upstream
  }, [tableKey]);

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

=======
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
>>>>>>> Stashed changes
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
            update={true}
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

export default CreateNewTable;
