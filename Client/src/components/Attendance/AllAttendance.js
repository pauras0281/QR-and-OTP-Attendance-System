import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Attendance = () => {
  const [lectures, setLectures] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/lectures');
        const data = await response.data;
        setLectures(data.lectures);
      } catch (error) {
        console.error('Error fetching lecture data:', error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/students/allstudents');
        const data = await response.data;
        console.log(data);
        setStudents(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchLectures();
    fetchStudents();
  }, []);

  const isPresent = (lecture, student) => {
    return lecture.attendedStudents.includes(student._id);
  };

  // Calculate attendance percentage for each student
  const calculateAttendancePercentage = (student) => {
    const totalLectures = lectures.length;
    const attendedLectures = lectures.filter(lecture => isPresent(lecture, student)).length;
    const attendancePercentage = (attendedLectures / totalLectures) * 100;
    return isNaN(attendancePercentage) ? 0 : attendancePercentage.toFixed(2);
  };

  return (
    <>
      <Header />
      <div className="attendance-container">
        <h2 className='text-center'>Attendance Records</h2>
        <table id="attendance-table">
          <thead>
            <tr>
              <th className="student-header">Students</th>
              {lectures.map(lecture => (
                <th key={lecture._id} className="lecture-header">
                  {lecture.lectureName}
                </th>
              ))}
              <th className="percentage-header">Attendance Percentage</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id} className="student-row">
                <td className="student-name">{student.name}</td>
                {lectures.map(lecture => (
                  <td key={lecture._id} className={isPresent(lecture, student) ? 'present' : 'absent'}>
                    {isPresent(lecture, student) ? 'P' : 'A'}
                  </td>
                ))}
                <td 
                  className={`attendance-percentage ${
                    calculateAttendancePercentage(student) < 75 ? 'low' : 'high'
                  }`} >{calculateAttendancePercentage(student)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Attendance;
