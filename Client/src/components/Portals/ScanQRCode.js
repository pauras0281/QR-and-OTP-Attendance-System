// ScanQRCode.js
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

import Success from './Success';

const ScanQRCode = ({onClose}) => {
    const [qrData, setQRData] = useState('');
    const userId = sessionStorage.getItem('userId')

    console.log(qrData);

    const [showSuccessPortal, setShowSuccessPortal] = useState(false);
    const [message, setMessage] = useState("")


    const handleSuccess = () => {
        setShowSuccessPortal(false)
    }


    const handleScan = async (data) => {
        if (data) {
            setQRData(data.text)
            try {
                const response = await axios.post('http://localhost:8080/api/lectures/lecture/scanqr', {
                    scannedData: data.text, // Send only the text content to the backend
                    userId
                });
                console.log(response.data.message);
                setMessage(response.data.message)

                if (response.status === 200 ) {
                
                    setShowSuccessPortal(true); 
                }

            } catch (error) {
                console.error('Error scanning QR code:', error);
            }
        }
    };

    const handleError = (error) => {
        console.error('QR Scanner Error:', error);
    };

    return (
        <>
            <div className='portal-container' onClick={onClose}></div>
            <div className='container'>
                <div className='scanqr-container'>
                <h2>Scan QR Code</h2>
                <QrReader
                    className='qr-scanner'
                    delay={300}
                    onError={handleError}
                    onResult={handleScan}
                />
                <p>{qrData}</p>
                </div>
                {showSuccessPortal && <Success message={message} onClick={handleSuccess} />}
            </div>
        </>
    );
};

export default ScanQRCode;





