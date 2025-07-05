import React, { useState } from 'react'
import './index.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import MarkAttendance from '../Portals/MarkAttendance'
import { useNavigate } from 'react-router-dom'
import Profile from '../Portals/Profile'
import BadRequest from '../BadRequest/BadRequest'
import Success from '../Portals/Success'

const StudentHome = () => {
    const navigate = useNavigate()
    const userId = sessionStorage.getItem( "userId" );

    const [showProfile, setShowProfile] = useState(false)
    const [mark, setMark] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const handleSuccess = () =>{
        setShowSuccess(false)
    }

    const handleMark = ()=>{
        setMark(false)
    }
    const handleProfile = ()=>{
        setShowProfile(false)
    }

    if(sessionStorage.getItem('userRole') !== "Student"){
        return(
            
            <BadRequest route="/admindash" />
            
        )
    }

  return (
    <>
    <Header />
    <div className='dashContainer'>
      <div className='menu-card' id='first' onClick={()=>navigate('/student/attendance')} >
            <h4>Check Attendance</h4>
            <div className='logo'><i className="fa-regular fa-address-book"></i></div>
        </div>
        <div className='menu-card' id='second' onClick={()=>navigate('/student/all-lectures')}>
            <h4>All Lectures</h4>
            <div className='logo'><i className="fa-solid fa-file-lines"></i></div>
        </div>
        <div className='menu-card' id='second' onClick={()=>setMark(true)}>
            <h4>Mark Attendance</h4>
            <div className='logo'><i className="fa-solid fa-file-lines"></i></div>
        </div>
        <div className='menu-card' id='third' onClick={()=>setShowProfile(true)}>
            <h4>Profile</h4>
            <div className='logo'><i className="fa-solid fa-user-large"></i></div>
        </div>
        <div className='menu-card' id='fifth'>
            <h4>Settings</h4>
            <div className='logo'><i className="fa-solid fa-gear"></i></div>
        </div>
        <div className='menu-card' id='fourth' onClick={()=>setShowSuccess(true)} >
            <h4>Help and Support</h4>
            <div className='logo'><i className="fa-regular fa-comment"></i></div>
        </div>
        
        
    </div>
    <div className='icons'>
    <a href='#first'><i className="fa-regular fa-address-book icons-list"></i></a>
    <a href='#second'><i className="fa-solid fa-file-lines icons-list"></i></a>
    <a href='#third'><i className="fa-solid fa-user-large icons-list"></i></a>
    <a href='#fourth'><i className="fa-regular fa-comment icons-list"></i></a>
    <a href='#fifth'><i className="fa-solid fa-gear icons-list"></i></a>
    </div>

    <Footer />
    {mark && <MarkAttendance onClick={handleMark} />}
    {showProfile && <Profile onClick={handleProfile}/>}
    {showSuccess && <Success message={`Successfully Done`} onClick={handleSuccess} />}

    </>
    
  )
}

export default StudentHome
