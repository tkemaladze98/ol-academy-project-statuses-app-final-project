import { useEffect, useState } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import setExpiryTime from "../../utils/getExpiryTime";

const generateNewStudentsArray = (studentArray, studentName, currentIndex) => {
  return studentArray.map((student, index) => {
    if (index === currentIndex) {
      student = studentName;
    }
    return student;
  });
};

const StudentsNameForm = ({
  students,
  setStudents,
  currentStageIncrement,
  currentStageDecrement,
  table,
  setNewTable,
  update,
}) => {
  const [isAnyEmptyField, setIsAnyEmptyField] = useState();

  useEffect(() => {
    const isEmpty = students.some((student) => student.trim().length === 0);
    setIsAnyEmptyField(isEmpty);
  }, [students]);

  const addStudentName = (e, currentIndex) => {
    const studentName = e.target.value;
    const newStudentsNamesArray = generateNewStudentsArray(
      students,
      studentName,
      currentIndex
    );
    if (update) {
      const newTable = table;
      newTable.students = [
        ...table.students,
        { studentName: studentName, projects: {} },
      ];
      setNewTable(newTable);
    }
    setStudents(newStudentsNamesArray);
  };

  const addNewInput = () => {
    setStudents([...students, ""]);
  };

  const removeInput = (currentIndex) => {
    const tmpStudentsArray = students.filter(
      (_, studentId) => studentId !== currentIndex
    );
    setStudents(tmpStudentsArray);
  };

  const saveToLocalStorage = (e, currentIndex) => {
    const studentName = e.target.value;
    const newStudentsNamesArray = generateNewStudentsArray(
      students,
      studentName,
      currentIndex
    );
    localStorage.setItem("students", JSON.stringify(newStudentsNamesArray));
    setExpiryTime();
  };
  return (
    <div className="form-group-wrapper">
      {students.map((studentName, index) => {
        return (
          <div key={index} className="form-group">
            <label htmlFor="students">Enter students names</label>
            <input
              id="students"
              type="text"
              name="students"
              placeholder="Enter here"
              value={studentName}
              onChange={(e) => {
                update !== true && saveToLocalStorage(e, index);
                addStudentName(e, index);
              }}
            />
            {students.length > 1 && (
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
        <button disabled={isAnyEmptyField} onClick={currentStageIncrement}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentsNameForm;
