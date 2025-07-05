import React, { useState } from "react";
import  ReactDOM  from "react-dom";

import './index.css'
import ScanQRCode from "./ScanQRCode";
import EnterOTP from './EnterOTP'

const MarkAttendance = ({onClick}) => {
  const [scanner, setScanner] = useState(false)
  const  [otpBox, setOtpBox] = useState(false)

  return ReactDOM.createPortal(
    <>
    <div className="portal-container" onClick={onClick} ></div>
      <div className="container">
      
        <div className="mark-container">
        <h1>Choose Any One Option</h1>
        <div className="scan-container" >
        
          <div className="options" onClick={()=>setScanner(true)}>Scan QR</div>
          <div className="options" onClick={()=>setOtpBox(true)} >Enter OTP</div>
          </div>
          </div>
          {otpBox && <EnterOTP />}
          {scanner && <ScanQRCode />}
      </div>
      </>
    , 
    document.getElementById('portal')
  );
};

export default MarkAttendance;
