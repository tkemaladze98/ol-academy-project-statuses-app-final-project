import { useState, useEffect } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import setExpiryTime from "../../utils/getExpiryTime";

const generateNewProjectsArray = (
  projectArray,
  projectName,
  currentIndex
) =>
  projectArray.map((project, index) => {
    if (index === currentIndex) {
      project = projectName;
    }
    return project;
  });

const ProjectsNameForm = ({
  update,
  projects,
  setProjects,
  generateTable,
  currentStageDecrement,
  currentStageIncrement,
}) => {
  const [isAnyEmptyField, setIsAnyEmptyField] = useState();

  useEffect(() => {
    const isEmpty = projects.some((student) => student.trim().length === 0);
    setIsAnyEmptyField(isEmpty);
  }, [projects]);

  const addProjectName = (e, currentIndex) => {
    const projectName = e.target.value;
    const newProjectsNamesArray = generateNewProjectsArray(
      projects,
      projectName,
      currentIndex
    );
    setProjects(newProjectsNamesArray);
  };

  const addNewInput = () => {
    setProjects([...projects, ""]);
  };

  const removeInput = (currentIndex) => {
    const tmpProjectsArray = projects.filter(
      (_, projectId) => projectId !== currentIndex
    );
    setProjects(tmpProjectsArray);
  };

  const saveToLocalStorage = (e, currentIndex) => {
    const projectName = e.target.value;
    const newProjectsNamesArray = generateNewProjectsArray(
      projects,
      projectName,
      currentIndex
    );
    localStorage.setItem("projects", JSON.stringify(newProjectsNamesArray));
    setExpiryTime();
  };

  return (
    <div className="form-group-wrapper">
      {projects.map((projectName, index) => {
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
                update !== true && saveToLocalStorage(e, index);
                addProjectName(e, index);
              }}
            />
            {projects.length > 1 && (
              <div className="minus">
                <AiFillMinusCircle onClick={() => removeInput(index)} />
              </div>
            )}
          </div>
        );
      })}
      <div className="plus">
        <AiFillPlusCircle onClick={addNewInput} />
      </div>
      <div className="buttons">
        <button onClick={currentStageDecrement}>Back</button>
        <button
          disabled={isAnyEmptyField}
          onClick={(e) => {
            generateTable(e);
            currentStageIncrement();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectsNameForm;
