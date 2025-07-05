import React, { useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './index.css'
import ShowQR from '../Portals/ShowQR'
import { useNavigate } from 'react-router-dom'
import Profile from '../Portals/Profile'
import CreateLecture from '../Portals/CreateLecture'
import BadRequest from '../BadRequest/BadRequest'

const AdminHome = () => {
    const navigate = useNavigate()

    const [showProfile, setShowProfile] = useState(false)
    const [showCreateLecture, setShowCreateLecture] = useState(false)

    const handleProfile = ()=>{
        setShowProfile(false)
    }
    const handleCreate = ()=>{
        setShowCreateLecture(false)
    }

    if(sessionStorage.getItem('userRole') !== "Teacher"){
        return(
            <BadRequest route="/stuedentdash" />
        )
    }
 
  return (
    <>
    <Header />
    <div className='dashContainer'>
        <div className='menu-card' id='first' onClick={()=>navigate('/admin/attendance')}>
            <h4>Check Attendance</h4>
            <div className='logo'><i className="fa-regular fa-address-book"></i></div>
        </div>
        <div className='menu-card' id='second' onClick={()=>setShowCreateLecture(true)}>
            <h4>Create Lecture</h4>
            <div className='logo'><i class="fa-solid fa-plus"></i></div>
        </div>
        <div className='menu-card' id='second' onClick={()=>navigate('/admin/all-lectures')}>
            <h4>All Lectures</h4>
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
        <div className='menu-card' id='fourth'>
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
    {showProfile && <Profile onClick={handleProfile}/>}
    {showCreateLecture && <CreateLecture onClick={handleCreate}/>}
    <Footer />
    </>
    
  )
}

export default AdminHome
