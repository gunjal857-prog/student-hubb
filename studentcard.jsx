function StudentCard({ students }) {
  return (
    <div>


      {students.map((student, index) => (
        <div key={index}>
          <h3>
            {student.name} {student.lastname}
          </h3>

          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
          <p>Contact: {student.contact}</p>
          <p>Fees: {student.fees}</p>
        </div>
      ))}
    </div>
  );
}

export default StudentCard;