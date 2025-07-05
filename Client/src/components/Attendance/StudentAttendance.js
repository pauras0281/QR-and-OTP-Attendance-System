import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const StudentAttendance = () => {
  const [lectures, setLectures] = useState([]);
  const [studentAttendance, setStudentAttendance] = useState([]);

  useEffect(() => {
    const fetchStudentAttendance = async () => {
      try {
        const lectureResponse = await axios.get(
          "http://localhost:8080/api/lectures"
        );
        const lectureData = await lectureResponse.data.lectures;

        // Fetch student's attendance
        const studentResponse = await axios.get(
          "http://localhost:8080/api/user/students/allstudents"
        );
        const studentData = await studentResponse.data;

        // Filter student's attendance for logged-in student
        const loggedInStudent = studentData.find(
          (student) => student._id === sessionStorage.getItem("userId")
        );

        if (loggedInStudent) {
          const studentAttendanceData = lectureData.map((lecture) => {
            const attendance = {
              lectureName: lecture.lectureName,
              teacherName: lecture.createdBy.name,
              date: new Date(lecture.Date).toLocaleDateString(),
              attendanceStatus: lecture.attendedStudents.includes(
                loggedInStudent._id
              )
                ? "Present"
                : "Absent",
            };
            return attendance;
          });
          setStudentAttendance(studentAttendanceData);
        }

        setLectures(lectureData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentAttendance();
  }, []);

  return (
    <>
      <Header />
      <div className="attendance-container">
        <h2 className="text-center">Your Attendance Records</h2>
        <table id="attendance-table">
          <thead>
            <tr>
              <th className="lecture-header">Lecture Name</th>
              <th className="teacher-header">Teacher</th>
              <th className="date-header">Date</th>
              <th className="attendance-header">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {studentAttendance.map((attendance, index) => (
              <tr key={index} className="attendance-row">
                <td>{attendance.lectureName}</td>
                <td>{attendance.teacherName}</td>
                <td>{attendance.date}</td>
                <td
                  className={
                    attendance.attendanceStatus === "Present"
                      ? "present"
                      : "absent"
                  }
                >
                  {attendance.attendanceStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default StudentAttendance;
