import React, { useRef, useEffect, useState } from "react";
import StudentCard from "./StudentCard";
const courseSubjects = {
  "Full Stack Development": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB"
  ],

  "Web Development": [
    "HTML",
    "CSS",
    "JavaScript"
  ],

  "C++ Programming": [
    "C++",
    "OOP",
    "Data Structure",
    "Algorithms"
  ]
};

function Stdlist() {
  const [Slipno, setSlipno] = useState(() => {
    const savedSlipno = localStorage.getItem("Slipno");
    return savedSlipno ? Number(savedSlipno) : 1;
  });

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

      setErrors((prev) => ({
        ...prev,
        [field]: ""
      }));

      nextInput.current.focus();
    }
  }


  function handleName(e) {
    const namevalue = e.target.value;

    // Only letters and spaces
    if (!/^[A-Za-z ]*$/.test(namevalue)) {
      setErrors((prev) => ({
        ...prev,
        name: "Only letters are allowed"
      }));
      return;
    }

    setName(namevalue);

    setErrors((prev) => ({
      ...prev,
      name: ""
    }));
  }



  function handleLastname(e) {
    const Lastnamevalue = e.target.value;

    // Only letters and spaces
    if (!/^[A-Za-z ]*$/.test(Lastnamevalue)) {
      setErrors((prev) => ({
        ...prev,
        lastname: "Only letters are allowed"
      }));
      return;
    }

    setLastname(Lastnamevalue);

    setErrors((prev) => ({
      ...prev,
      lastname: ""
    }));
  }


  function handleAddress(e) {
    const addressvalue = e.target.value;

    // Letters + numbers + / ( ) . , and spaces
    if (!/^[A-Za-z0-9\/()., ]*$/.test(addressvalue)) {
      setErrors((prev) => ({
        ...prev,
        address: "Special characters are not allowed"
      }));
      return;
    }

    setAddress(addressvalue);

    setErrors((prev) => ({
      ...prev,
      address: ""
    }));
  }



  function handlecontactnumber(e) {
    const cnumber = e.target.value;

    // Only numbers
    if (!/^\d*$/.test(cnumber)) {
      setErrors((prev) => ({
        ...prev,
        contact: "Only numbers are allowed"
      }));
      return;
    }

    // Maximum 10 digits
    if (cnumber.length > 10) {
      setErrors((prev) => ({
        ...prev,
        contact: "Contact number must be 10 digits"
      }));
      return;
    }

    setcontactnumber(cnumber);

    setErrors((prev) => ({
      ...prev,
      contact: ""
    }));
  }

  function handlefees(e){
    const feesvalue = e.target.value;

   if (!/^\d*\.?\d*$/.test(feesvalue)) {
      setErrors((prev) => ({
        ...prev,
        Fees: "Only numbers are allowed"
      }));
      return;
    }
     setFees(feesvalue);

    setErrors((prev) => ({
      ...prev,
     Fees: ""
    }));
  }
 
  function handlepayfees(e){
    const payablefees = e.target.value;

   if (!/^\d*\.?\d*$/.test(payablefees)) {
      setErrors((prev) => ({
        ...prev,
        Fees: "Only numbers are allowed"
      }));
      return;
    }
     setPayFees(payablefees);

    setErrors((prev) => ({
      ...prev,
     Fees: ""
    }));
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
    } else if (Contactnumber.length !== 10) {
      newErrors.contact = "Contact number must be 10 digits";
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

    // If errors exist, don't add student
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

 

    const studentDate = new Date().toLocaleDateString();

    const remainingFees =
      Number(Fees) - Number(payFees);

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
      subjects: courseSubjects[Course] || []
    };

    setStudents((prev) => [...prev, newStudent]);

    setSlipno((prev) => prev + 1);

    // Clear inputs
    setName("");
    setLastname("");
    setcontactnumber("");
    setAddress("");
    setcourse("");
    setAge("");
    setFees("");
    setPayFees("");

    // Clear subjects
   

    // Clear errors
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

    // Focus first input
    nameRef.current.focus();
  }

 


function  handlefunction(e){
  const coursename = e.target.value;

  if(coursename === "Full Stack Development"){
return courseSubjects["Full Stack Development"]

  }

  if(coursename === "Web Development"){
return courseSubjects["Web Development"]

  }

  if(coursename ===  "C++ Programming"){
return courseSubjects[ "C++ Programming"]

  }

}


  // function handleSubject(subject) {
  //   if (subjects.includes(subject)) {
  //     setSubjects(
  //       subjects.filter((item) => item !== subject)
  //     );
  //   } else {
  //     setSubjects([
  //       ...subjects,
  //       subject
  //     ]);
  //   }
  // }



  function deleteStudent(index) {
    const updatedStudents = students.filter(
      (student, i) => i !== index
    );

    setStudents(updatedStudents);
  }

  return (
    <>
      <StudentCard students={students} />

      <div className="slip">
        <div className="logo"></div>

        <div className="title">
          <h1>Student Slip</h1>
          <h2>Eassy Skill Academy</h2>
        </div>

        <div className="image"></div>
      </div>

      <div className="addmission">
        <div className="date">
          <h4>Date: {ShowDate()}</h4>
        </div>

        <div className="formname">
          <h1>Admission Form</h1>
        </div>

        <div className="slipno">
          <h4>
            Slip No: ADN
            {String(Slipno).padStart(3, "0")}
          </h4>
        </div>
      </div>

      <div className="detailes input-group input-group-sm mb-3">

     
        <div className="studentdetailes">

          <h4>
            First Name :

            <input
              ref={nameRef}
              value={name}
              onChange={handleName}
              onKeyDown={(e) =>
                handleEnter(
                  e,
                  name,
                  "name",
                  lastNameRef
                )
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
              onChange={handleLastname}
              onKeyDown={(e) =>
                handleEnter(
                  e,
                  Lastname,
                  "lastname",
                  contactRef
                )
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
              onChange={handlecontactnumber}
              onKeyDown={(e) =>
                handleEnter(
                  e,
                  Contactnumber,
                  "contact",
                  addressRef
                )
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
              onChange={handleAddress}
              onKeyDown={(e) =>
                handleEnter(
                  e,
                  Address,
                  "address",
                  courseRef
                )
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

           <select
  ref={courseRef}
  value={Course}
  onChange={(e) => {
    const selectedCourse = e.target.value;

    setcourse(selectedCourse);

    setErrors((prev) => ({
      ...prev,
      course: ""
    }));
  }}
>
  <option value="">Select Course</option>

  <option value="Full Stack Development">
    Full Stack Development
  </option>

  <option value="Web Development">
    Web Development
  </option>

  <option value="C++ Programming">
    C++ Programming
  </option>
</select>

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

                setErrors((prev) => ({
                  ...prev,
                  age: ""
                }));
              }}
              onKeyDown={(e) =>
                handleEnter(
                  e,
                  Age,
                  "age",
                  feesRef
                )
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
              onChange={handlefees}
              onKeyDown={(e) =>
                handleEnter(
                  e,
                  Fees,
                  "fees",
                  payFeesRef
                )
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
              onChange={handlepayfees}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();

                  if (payFees.trim() === "") {
                    setErrors((prev) => ({
                      ...prev,
                      payFees:
                        "Enter the payable fees"
                    }));
                    return;
                  }

                  addStudent();
                }
              }}
            />

            {errors.payFees && (
              <div className="error">
                {errors.payFees}
              </div>
            )}

         

       

             

          </h4>

        </div>

   

        <div className="submit">

          <button
            className="btn btn-success"
            onClick={addStudent}
          >
            Add Student
          </button>

        </div>

      </div>


      <div className="list">

        <table className="table">

          <thead>
            <tr>
              <th>Sr.NO</th>
              <th>Slip No</th>
              <th>Date</th>
              <th>Student name</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Course</th>
              <th>Age</th>
              <th>Fees</th>
              <th>Pay Fees</th>
              <th>Remaining</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {students.map((student, index) => (

              <tr key={index}>

                <td>{index + 1}</td>

                <td>
                  ADN
                  {String(student.slipNo).padStart(3, "0")}
                </td>

                <td>{student.date}</td>

                <td>
                  {student.name} {student.lastname}
                </td>

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
                    onClick={() =>
                      deleteStudent(index)
                    }
                  >
                    Delete
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* <StudentResult data ={students}/> */}
    </>
  );
}

export default Stdlist;
