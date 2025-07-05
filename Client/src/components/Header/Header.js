import React from 'react';
import './index.css'
import { useNavigate } from 'react-router-dom';



function Header() {
  const navigate = useNavigate()

  function handleSignout() {
    sessionStorage.clear()
    navigate('/login')
  }

  function goHome() {
    if (sessionStorage.getItem("userRole") === "Teacher") {
      navigate('/admindash')
    }else{
      navigate('/studentdash')
    }
    
  }



  return (
    <header className="header">
      
      <h1 onClick={goHome}>Attendify</h1>
      <h5 onClick={handleSignout}>Sign Out</h5>
    </header>
  );
}

export default Header;
