import { useState, useEffect } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const ProjectsNameForm = (props) => {
  const [isAnyEmptyField, setIsAnyEmptyField] = useState();

  useEffect(() => {
    const isEmpty = props.projects.some(
      (student) => student.trim().length === 0
    );
    setIsAnyEmptyField(isEmpty);
  }, [props.projects]);

  const addProjectName = (e, currentIndex) => {
    const projectName = e.target.value;
    const newProjectsNamesArray = props.projects.map((project, index) => {
      if (index === currentIndex) {
        project = projectName;
      }
      return project;
    });
    props.setProjects(newProjectsNamesArray);
  };

  const style = {
    fontSize: "40px",
    cursor: "pointer",
  };

  const addNewInput = () => {
    props.setProjects([...props.projects, ""]);
  };

  const removeInput = (currentIndex) => {
    const tmpProjectsArray = props.projects.filter(
      (_project, index) => index !== currentIndex
    );
    props.setProjects(tmpProjectsArray);
  };

  const saveToLocalStorage = (e, currentIndex) => {
    const projectName = e.target.value;
    const newProjectsNamesArray = props.projects.map((project, index) => {
      if (index === currentIndex) {
        project = projectName;
      }
      return project;
    });
    let tmpStorage = JSON.stringify(newProjectsNamesArray);
    localStorage.setItem("projects", tmpStorage);
    localStorage.setItem("expiry", new Date().getTime() + 10 * 60 * 1000);
  };

  return (
    <div className="form-group-wrapper">
      {props.projects.map((projectName, index) => {
        return (
          <div key={index} className="form-group">
            <label htmlFor="projects">Enter projects names</label>
            <input
              id="projects"
              type="text"
              name="projects"
              placeholder="Enter here"
              value={projectName}
              onChange={(e) => {
                props.update !== true && saveToLocalStorage(e, index);
                addProjectName(e, index);
              }}
            />
            {props.projects.length > 1 && (
              <div className="minus">
                <AiFillMinusCircle
                  style={style}
                  onClick={() => removeInput(index)}
                />
              </div>
            )}
          </div>
        );
      })}
      <div className="plus">
        <AiFillPlusCircle style={style} onClick={addNewInput} />
      </div>
      <div className="buttons">
        <button onClick={props.currentStageDecrement}>Back</button>
        <button
          disabled={isAnyEmptyField}
          onClick={(e) => {
            props.generateTable(e);
            props.currentStageIncrement();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectsNameForm;
