import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = () => {
    const [lectures, setLectures] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const response = await axios.get('/api/lectures');
                setLectures(response.data);
            } catch (error) {
                console.error('Error fetching lecture data:', error);
            }
        };

        const fetchStudents = async () => {
            try {
                const response = await axios.get('/api/students');
                setStudents(response.data);
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

    return (
        <div>
            <h2>Attendance Records</h2>
            <table>
                <thead>
                    <tr>
                        <th>Students</th>
                        {lectures.map(lecture => (
                            <th key={lecture._id}>{lecture.lectureName}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            {lectures.map(lecture => (
                                <td key={lecture._id}>
                                    {isPresent(lecture, student) ? 'P' : 'A'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Attendance;
