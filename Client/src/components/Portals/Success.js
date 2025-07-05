import React, { useState } from 'react'

const Success = ({message, onClick}) => {

    const [showTick, setShowTick] = useState(true)


    return (
        <>
            <div className='portal-container' onClick={onClick}></div>
            <div className='container'>
                <div className='success-message'>
                    <div className={`tick-container ${showTick ? 'show' : ''}`}>
                        <div className="tick  show"></div>
                    </div>
                    <div className='message'>
                        {message}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Success
