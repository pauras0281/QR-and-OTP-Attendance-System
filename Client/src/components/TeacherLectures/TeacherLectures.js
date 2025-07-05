// TeacherLectures.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowQR from '../Portals/ShowQR';
import './index.css'
import BadRequest from '../BadRequest/BadRequest';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'

function TeacherLectures() {
  const [showQRStates, setShowQRStates] = useState([]);
  const [lectures, setLectures] = useState([]);
  const role = sessionStorage.getItem('userRole')



  
  const toggleShowQR = (index) => {
    const updatedShowQRStates = [...showQRStates];
    updatedShowQRStates[index] = !updatedShowQRStates[index];
    setShowQRStates(updatedShowQRStates);
  };

  useEffect(() => {
    
    fetchAllLectures();
  }, []);

  const fetchAllLectures = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/lectures');
      const data = await response.data
      setLectures(data.lectures);
    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };

  if(role !== 'Teacher'){
    return <BadRequest route='/student/all-lectures' />
  }


  return (
    <>
    <Header />
    <div className='cont'>
      <h2 className='text-center'>All Lectures</h2>
      <table>
        <thead>
          <tr>
            <th>Lecture Name</th>
            <th>Created By</th>
            <th>Subject</th>
            <th>Show QR and OTP</th>
           
          </tr>
        </thead>
        <tbody>
          {lectures.map((lecture, index) => (
            <tr key={lecture._id}>
              <td>{lecture.lectureName}</td>
              <td>{lecture.createdBy.name}</td>
              <td>{lecture.subject.name }</td>
              <td onClick={() => toggleShowQR(index)}><a href='#'>Get QR & OTP</a></td>
    {showQRStates[index] && <ShowQR onClick={() => toggleShowQR(index)} lectureID={lecture._id} />}           
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    <Footer />
    </>
  );
}

export default TeacherLectures;
