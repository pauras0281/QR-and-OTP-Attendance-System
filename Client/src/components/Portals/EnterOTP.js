// EnterOTP.js
import React, { useState } from 'react';
import axios from 'axios';
import Success from './Success';

const EnterOTP = ({onClose}) => {
    const [enteredOTP, setEnteredOTP] = useState('');
    const [showSuccessPortal, setShowSuccessPortal] = useState(false);
    const [message, setMessage] = useState("")


    const userId = sessionStorage.getItem('userId')
    
    const handleSuccess = () => {
        setShowSuccessPortal(false)
    }
    

    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/lectures/lecture/enterotp', {
                enteredOTP: enteredOTP,
                userId
            });
            console.log(response.data.message);
            setMessage(response.data.message)

            if (response.status === 200 ) {
                
                setShowSuccessPortal(true); 
            }

        } catch (error) {
            console.error('Error entering OTP:', error);
        }
    };

    return (
        <>
            <div className='portal-container' onClick={onClose}></div>
            <div className='container'>
                <div id='enterotp-container'>
                <h2>Enter OTP</h2>
                <form onSubmit={handleOTPSubmit}>
                    <input
                        type='text'
                        placeholder=''
                        value={enteredOTP}
                        onChange={(e) => setEnteredOTP(e.target.value)}
                    />
                    <button type='submit'>Submit</button>
                </form>
                </div>
                {showSuccessPortal && <Success message={message} onClick={handleSuccess} />}
            </div>
        </>
    );
};

export default EnterOTP;





