import React, { useEffect, useState } from "react";
import "../../styles/createNewTable.scss";
import TableModel from "../../models/TableModel";
import Table from "../table/Table";
import TittleForm from "../formGroups/TittleForm";
import StudentsNameForm from "../formGroups/StudentsNameForm";
import ProjectsNameForm from "../formGroups/ProjectsNameForm";
import ProgressBar from "../progressBar/ProgressBar";

const CreateNewTable = () => {
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
            : "white";
      });
      return item;
    });
    const newtable = new TableModel(title, projects, newStudents);
    setNewTable(newtable);
  };
  const currentStageIncrement = () => {
    setCurrentStage(currentStage + 1);
  };
  const currentStageDecrement = () => {
    setCurrentStage(currentStage - 1);
  };

  // useEffect(() => {
  //   const currentData = localStorage.getItem("current");
  //   if (currentData.title !== undefined) {
  //     setTitle(currentData.title);
  //   }
  //   if (currentData.students !== undefined) {
  //     setStudents(currentData.students);
  //   }
  //   if (currentData.projects !== undefined) {
  //     setProjects(currentData.projects);
  //   }
  // }, []);

  return (
    <div className="table-form">
      <form>
        {currentStage === 1 && (
          <TittleForm
            title={title}
            setTitle={setTitle}
            currentStageIncrement={currentStageIncrement}
          />
        )}
        {currentStage === 2 && (
          <StudentsNameForm
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
