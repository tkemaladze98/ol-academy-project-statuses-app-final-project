import React, { useEffect, useState } from "react";
import "../../styles/createNewTable.scss";
import TableModel from "../../models/TableModel";
import Table from "../table/Table";

const CreateNewTable = () => {
  const [students, setStudents] = useState("");
  const [projects, setProjects] = useState("");
  const [title, setTitle] = useState("");
  const [showGeneratedTable, setShowGeneratedTable] = useState(false);
  const [newTable, setNewTable] = useState();

  const generateTable = (e) => {
    e.preventDefault();
    if (
      students.trim().length > 0 &&
      projects.trim().length > 0 &&
      title.trim().length > 0
    ) {
      const newProjects = projects.split(",").map((item) => {
        if (item.includes(" ")) {
          item = item.replace(/\s/g, "");
        }
        return item;
      });
      const newStundets = students.split(",").map((item) => {
        if (item.includes(" ")) {
          item = item.replace(/\s/g, "");
        }
        item = { studentName: item, projects: {} };
        newProjects.forEach((project) => {
          item.projects[project] = "white"
        });
        return item;
      });
      const newtable = new TableModel(title, newProjects, newStundets);
      setNewTable(newtable);
      console.log(newtable)
      setShowGeneratedTable(true);
    } else {
      alert("გთხოვთ შეავსოთ ყველა ველი");
    }
  };

  // useEffect(() => {
  //   if (localStorage.getItem("students") !== null) {
  //     setStudents(localStorage.getItem("students"));
  //   }
  //   if (localStorage.getItem("title") !== null) {
  //     setTitle(localStorage.getItem("title"));
  //   }
  //   if (localStorage.getItem("projects") !== null) {
  //     setProjects(localStorage.getItem("projects"));
  //   }
  // }, []);

  return (
    <div className="table-form">
      <form>
        <div className="form-group">
          <label htmlFor="title">Enter table title</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Enter here"
            value={title}
            onChange={(e) => {
              // localStorage.setItem("title", e.target.value);
              setTitle(e.target.value);
            }}
          />
        </div>
        <p>
          *შეიყვანეთ სტუდენტების სია, მათი სახელები გამოყავით მძიმით
          (student1,student2,..etc)
        </p>
        <div className="form-group">
          <label htmlFor="students">Enter students names</label>
          <input
            id="students"
            type="text"
            name="students"
            placeholder="Enter here"
            value={students}
            onChange={(e) => {
              // localStorage.setItem("students", e.target.value);
              setStudents(e.target.value);
            }}
          />
        </div>
        <p>
          *შეიყვანეთ დავალებების სია, მათი სახელები გამოყავით მძიმით
          (project1,project2,..etc)
        </p>
        <div className="form-group">
          <label htmlFor="projects">Enter projects names</label>
          <input
            id="projects"
            type="text"
            name="projects"
            placeholder="Enter here"
            value={projects}
            onChange={(e) => {
              // localStorage.setItem("projects", e.target.value);
              setProjects(e.target.value);
            }}
          />
        </div>
        <button onClick={generateTable}>Generate Table</button>
      </form>
      {showGeneratedTable && <Table table={newTable} />}
    </div>
  );
};

export default CreateNewTable;
