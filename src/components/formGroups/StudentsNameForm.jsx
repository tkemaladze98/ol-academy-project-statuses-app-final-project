import { useEffect, useState } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const StudentsNameForm = ({
  students,
  setStudents,
  currentStageIncrement,
  currentStageDecrement,
}) => {
  const [isAnyEmptyField, setIsAnyEmptyField] = useState();

  useEffect(() => {
    const isEmpty = students.some((student) => student.trim().length === 0);
    setIsAnyEmptyField(isEmpty);
  }, [students]);

  const addStudentName = (e, currentIndex) => {
    const studentName = e.target.value;
    const newStudentsNamesArray = students.map((student, index) => {
      if (index === currentIndex) {
        student = studentName;
      }
      return student;
    });
    setStudents(newStudentsNamesArray);
  };

  const style = {
    fontSize: "40px",
    cursor: "pointer",
  };

  const addNewInput = () => {
    setStudents([...students, ""]);
  };

  const removeInput = (currentIndex) => {
    const tmpStudentsArray = students.filter(
      (_student, index) => index !== currentIndex
    );
    setStudents(tmpStudentsArray);
  };

//   const saveToLocalStorage = () => {
//     let tmpStorage = localStorage.getItem("current");
//     tmpStorage.students = students;
//     localStorage.setItem("current", tmpStorage);
//   };
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
                // saveToLocalStorage()
                addStudentName(e, index);
              }}
            />
            {students.length > 1 && (
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
        <button onClick={currentStageDecrement}>Back</button>
        <button disabled={isAnyEmptyField} onClick={currentStageIncrement}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentsNameForm;