import React, { useState, useEffect } from 'react';
import './index.css'
import ReactDOM from 'react-dom'
import axios from 'axios';

function ShowQR({lectureID, onClick}) {
  const [lecture, setLecture] = useState(null);
    const [qr , setQR] = useState("")


  useEffect(() => {
    // Fetch lecture details after component mounts
    fetchLectureDetails();
  }, []);

  const fetchLectureDetails = async () => {
    try {
      // Make a GET request to fetch lecture details
      const response = await axios.get(`http://localhost:8080/api/lectures/${lectureID}`); // Replace 'lectureId' with the actual ID of the lecture
      const data = await response.data;
      console.log(data);
      setLecture(data.updatedLecture);
      setQR(data.qrImage)

    } catch (error) {
      console.error('Error fetching lecture details:', error);
    }
  };

  const handleContainerClick = (event) => {
    // Prevent the event from bubbling up to the parent container
    event.stopPropagation();
  };

  return ReactDOM.createPortal(
    <div className='portal-container' onClick={onClick}>
      {lecture && (
        <div className="container" onClick={handleContainerClick}>
          <div className='showqr-container'>
            <h2 className="title">{lecture.lectureName}</h2>
            <div className="info">
              <p>Date: {lecture.Date}</p>
            </div>
            <div className="qr-code">
              <p>QR Code:</p>
              <img src={qr} alt="QR Code" />
            </div>
            <div className="otp">
              <p>OTP: {lecture.otp}</p>
            </div>
            
          </div>
        </div>
      )}
    </div>, 
    document.getElementById("portal")
  );
}
 
export default ShowQR;
