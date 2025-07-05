import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'
import ScanQRCode from '../Portals/ScanQRCode';
import EnterOTP from '../Portals/EnterOTP'
import BadRequest from '../BadRequest/BadRequest';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';


const StudentLectures = () => {
    const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScanQRPortal, setShowScanQRPortal] = useState(false); 
  const [showOTPPortal, setShowOTPPortal] = useState(false); 
  const [selectedLectureId, setSelectedLectureId] = useState(null); 


  
  useEffect(() => {

    


    const fetchLectures = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/lectures');
        const data = response.data.lectures
        setLectures(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lectures:', error);
        setLoading(false);
      }
    };
    fetchLectures();
  }, []);
  if(sessionStorage.getItem('userRole') !== 'Student'){
    return <BadRequest route='/admin/all-lectures' />
  }

  const handleScanQR = (lectureId) => {
    console.log('Scanning QR code for lecture:', lectureId);
    setSelectedLectureId(lectureId);
    setShowScanQRPortal(true);

  };

  const handleEnterOTP = (lectureId) => {
    console.log('Entering OTP for lecture:', lectureId);
    setSelectedLectureId(lectureId);
    setShowOTPPortal(true);
  };

  const isExpired = (lecture) => {
    return new Date(lecture.otpExpiry) < new Date();
  };

  return (<>
  <Header />
    <div className="lecture-container">
      <h2 className="lecture-heading text-center">All Lectures</h2>
      {loading ? (
        <p>Loading...</p>
      ) : lectures.length === 0 ? (
        <p>No lectures available</p>
      ) : (
        <table className="lecture-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Teacher</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lectures.map((lecture) => (
              <tr key={lecture._id}>
                <td>{lecture.lectureName}</td>
                <td>{lecture.createdBy.name}</td>
                <td>{new Date(lecture.Date).toLocaleDateString()}</td>
                <td>{new Date(lecture.Date).toLocaleTimeString()}</td>
                <td>
                  <button
                    className="scan-btn"
                    onClick={() => handleScanQR(lecture._id)}
                    disabled={isExpired(lecture)}
                  >
                    Scan QR
                  </button>
                  <button
                    className="otp-btn"
                    onClick={() => handleEnterOTP(lecture._id)}
                    disabled={isExpired(lecture)}
                  >
                    Enter OTP
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showScanQRPortal && <ScanQRCode lectureId={selectedLectureId} onClose={() => setShowScanQRPortal(false)} />}
            {showOTPPortal && <EnterOTP lectureId={selectedLectureId} onClose={() => setShowOTPPortal(false)} />}

    </div>
    <Footer />
    </>
  );
};
export default StudentLectures
