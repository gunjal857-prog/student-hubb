import React, { useRef,useEffect, useState } from "react";
import StudentCard from "./StudentCard";
function Stdlist() {
  const [Slipno, setSlipno] = useState(() => {
    const savedSlipno = localStorage.getItem("Slipno");
    
    return savedSlipno ? Number(savedSlipno) : 1;
  });
  
  //   const [Slipno, setSlipno] = useState(1) 
  
  const [name, setName] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Contactnumber, setcontactnumber] = useState("");
  const [Address, setAddress] = useState("");
  const [Course, setcourse] = useState("");
  const [Age, setAge] = useState("");
  const [Fees, setFees] = useState("");
  const [payFees, setPayFees] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(false);

  const nameRef = useRef();
  const lastNameRef = useRef();
  const contactRef = useRef();
  const addressRef = useRef();
  const courseRef = useRef();
  const ageRef = useRef();
  const feesRef = useRef();
  const payFeesRef = useRef();


  const [students, setStudents] = useState(() => {
  const savedStudents = localStorage.getItem("students");

  return savedStudents ? JSON.parse(savedStudents) : [];
  });
  useEffect(() => {
  localStorage.setItem("students", JSON.stringify(students));
   localStorage.setItem("Slipno", Slipno);
}, [students, Slipno]);


  function ShowDate() {
    const date = new Date();
    return date.toLocaleDateString();
  }
 const [errors, setErrors] = useState({
  name: "",
  lastname: "",
  contact: "",
  address: "",
  course: "",
  age: "",
  fees: "",
  payFees: ""
});

function handleEnter(e, value, field, nextInput) {
  if (e.key === "Enter") {
    e.preventDefault();

    if (value.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        [field]: `Enter the ${field}`
      }));

      return;
    }

    // Error remove
    setErrors((prev) => ({
      ...prev,
      [field]: ""
    }));

    nextInput.current.focus();
  }
}
  function addStudent() {
  const newErrors = {};

  if (name.trim() === "") {
    newErrors.name = "Enter the name";
  }

  if (Lastname.trim() === "") {
    newErrors.lastname = "Enter the last name";
  }

  if (Contactnumber.trim() === "") {
    newErrors.contact = "Enter the contact number";
  }

  if (Address.trim() === "") {
    newErrors.address = "Enter the address";
  }

  if (Course.trim() === "") {
    newErrors.course = "Enter the course";
  }

  if (Age.trim() === "") {
    newErrors.age = "Enter the age";
  }

  if (Fees.trim() === "") {
    newErrors.fees = "Enter the fees";
  }

  if (payFees.trim() === "") {
    newErrors.payFees = "Enter the payable fees";
  }

  // Errors hain to student add mat karo
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  // Sab fields filled hain → student add hoga
  const studentDate = new Date().toLocaleDateString();

  const remainingFees = Number(Fees) - Number(payFees);

  const newStudent = {
    slipNo: Slipno,
    date: studentDate,
    name: name,
    lastname: Lastname,
    contact: Contactnumber,
    address: Address,
    course: Course,
    age: Age,
    fees: Fees,
    payFees: payFees,
    remainingFees: remainingFees,
      subjects: subjects
  };

  setStudents([...students, newStudent]);

  setSlipno(Slipno + 1);

  setName("");
  setLastname("");
  setcontactnumber("");
  setAddress("");
  setcourse("");
  setAge("");
  setFees("");
  setPayFees("");

  setErrors({
    name: "",
    lastname: "",
    contact: "",
    address: "",
    course: "",
    age: "",
    fees: "",
    payFees: ""
  });

  nameRef.current.focus();
}


const subjectList = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "C++"
];

function handleSubject(subject) {

  if (subjects.includes(subject)) {

    setSubjects(
      subjects.filter((item) => item !== subject)
    );

  } else {

    setSubjects([
      ...subjects,
      subject
    ]);

  }
}


function deleteStudent(index) {
  const updatedStudents = students.filter((student, i) => {
    return i !== index;
  });

  setStudents(updatedStudents);
}







  return (
    <>
    <StudentCard students = {students}/>

      <div className="slip">

        <div className="logo">
          
         
        </div>

        <div className="title">
          <h1>Student Slip</h1>
          <h2>Eassy Skill Academy</h2>
        </div>

        <div className="image">
         
          
        </div>

      </div>

      <div className="addmission  ">

        <div className="date">
          <h4>Date: {ShowDate()}</h4>
        </div>

        <div className="formname">
          <h1>Admission Form</h1>
        </div>

        <div className="slipno">
          <h4>Slip No: ADN{String(Slipno).padStart(3, "0")}</h4>
        </div>

      </div>

      <div className="detailes input-group input-group-sm mb-3">

        <div className="studentdetailes">

     <h4>
  First Name :
  <input
    ref={nameRef}
    value={name}
    onChange={(e) => {
      setName(e.target.value);
      setErrors((prev) => ({ ...prev, name: "" }));
    }}
    onKeyDown={(e) =>
      handleEnter(e, name, "name", lastNameRef)
    }
  />

  {errors.name && (
    <div className="error">
      {errors.name}
    </div>
  )}
</h4>

         <h4>
  Last Name :
  <input
    ref={lastNameRef}
    value={Lastname}
    onChange={(e) => {
      setLastname(e.target.value);
      setErrors((prev) => ({ ...prev, lastname: "" }));
    }}
    onKeyDown={(e) =>
      handleEnter(e, Lastname, "last name", contactRef)
    }
  />

  {errors.lastname && (
    <div className="error">
      {errors.lastname}
    </div>
  )}
</h4>

        <h4>
  Contact Number :
  <input
    ref={contactRef}
    value={Contactnumber}
    onChange={(e) => {
      setcontactnumber(e.target.value);
      setErrors((prev) => ({ ...prev, contact: "" }));
    }}
    onKeyDown={(e) =>
      handleEnter(e, Contactnumber, "contact number", addressRef)
    }
  />

  {errors.contact && (
    <div className="error">
      {errors.contact}
    </div>
  )}
</h4>

         <h4>
  Address :
  <input
    ref={addressRef}
    value={Address}
    onChange={(e) => {
      setAddress(e.target.value);
      setErrors((prev) => ({ ...prev, address: "" }));
    }}
    onKeyDown={(e) =>
      handleEnter(e, Address, "address", courseRef)
    }
  />

  {errors.address && (
    <div className="error">
      {errors.address}
    </div>
  )}
</h4>
            </div>
<div className="secound">

          <h4>
  Course :
  <input
    ref={courseRef}
    value={Course}
    onChange={(e) => {
      setcourse(e.target.value);
      setErrors((prev) => ({ ...prev, course: "" }));
    }}
    onKeyDown={(e) =>
      handleEnter(e, Course, "course", ageRef)
    }
  />

  {errors.course && (
    <div className="error">
      {errors.course}
    </div>
  )}
</h4>
     <h4>
  Age :
  <input
    ref={ageRef}
    value={Age}
    onChange={(e) => {
      setAge(e.target.value);
      setErrors((prev) => ({ ...prev, age: "" }));
    }}
    onKeyDown={(e) =>
      handleEnter(e, Age, "age", feesRef)
    }
  />

  {errors.age && (
    <div className="error">
      {errors.age}
    </div>
  )}
</h4>

          <h4>
  Fees :
  <input
    ref={feesRef}
    value={Fees}
    onChange={(e) => {
      setFees(e.target.value);
      setErrors((prev) => ({ ...prev, fees: "" }));
    }}
    onKeyDown={(e) =>
      handleEnter(e, Fees, "fees", payFeesRef)
    }
  />

  {errors.fees && (
    <div className="error">
      {errors.fees}
    </div>
  )}
</h4>

        <h4>
  Payable Fees :
  <input
    ref={payFeesRef}
    value={payFees}
    onChange={(e) => {
      setPayFees(e.target.value);
      setErrors((prev) => ({ ...prev, payFees: "" }));
    }}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        if (payFees.trim() === "") {
          setErrors((prev) => ({
            ...prev,
            payFees: "Enter the payable fees"
          }));

          return;
        }

        setErrors((prev) => ({
          ...prev,
          payFees: ""
        }));

        addStudent();
      }
    }}
  />

  {errors.payFees && (
    <div className="error">
      {errors.payFees}
    </div>
  )}


  <div className="subjectSelect">

      {/* Button */}
      <button className="btn btn-primary"
        type="button"
        onClick={() => setOpen(!open)}
      >
        Select Subject
      </button>

      {/* Box */}
      {open && (
        <div className="subjectBox">

          {subjectList.map((subject) => (

            <label key={subject}>

              <input
                type="checkbox"
                checked={subjects.includes(subject)}
                onChange={() => handleSubject(subject)}
              />

              {subject}

            </label>

          ))}

          <button className="btn btn-danger"
            type="button"
            onClick={() => setOpen(false)}
          >
            Done
          </button>

        </div>
      )}

      {/* Selected subjects */}
      <p>
        Selected: {subjects.join(", ")}
      </p>

    </div>



</h4>

                </div>
                <div className="submit">

          <button className="btn btn-success" onClick={addStudent}>
            Add Student
          </button>
                </div>


      </div>
      <div className="list">

        <table  className="table" >
          <thead>
            <tr>
              <th>Sr.NO</th>
              <th>Slip No</th>
              <th>Date</th>
              <th>Student name</th>
              <th>Contact</th>
              <th>address</th>
              <th>Course</th>
              <th>Age</th>
              <th>Fees</th>
              <th>payfees</th>
              <th>Rimeaing</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
              <td>
  ADN{String(student.slipNo).padStart(3, "0")}
</td>  
        <td>{student.date}</td>
                <td>{student.name} {student.lastname}</td>
                <td>{student.contact}</td>
                <td>{student.address}</td>
                <td>{student.course}</td>
                <td>{student.age}</td>
                <td>{student.fees}</td>
                <td>{student.payFees}</td>
                <td>{student.remainingFees}</td>
                <td>
                  
                      <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteStudent(index)}
        >
          Delete
        </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </>
  );
}

export default Stdlist;