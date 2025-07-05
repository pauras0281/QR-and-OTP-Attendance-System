import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./index.css";
import axios from "axios";

const Signup = () => {
  const [isTeacher, setIsTeacher] = useState({
    status: false,
    id: ""
  })

  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
    phone:"",
    role:"",
    adminKey:""
  });

  const navigate = useNavigate();
  


  const sendRequest = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/user/signup', formData);
      const data =await response.data
      console.log(data);

      // Extract user role from response data
      const { role } = data;
      console.log(role);

      
      if (role === 'Student') {
        navigate('/studentdash');
      } else if (role === 'Teacher') {
        navigate('/admindash');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendRequest()
    
  };

  const handleClick = () => {
    navigate("/login");
  };
  const defineTeacher = (e)=>{
    console.log(e.target.value);
    setIsTeacher({
      status: !isTeacher.status, id: e.target.value
    })
    setFormData({ ...formData, role: e.target.value})
  }

  return (
    <>
      <Header />
      

      <form className="signup" onSubmit={handleSubmit}>
      <div className="userAuth">
        
        <p id="signupas">Sign up as </p>
        <p>Teacher <input
          type="radio"
          name="role"
          className="userStatus"
          value="Teacher" 
          onClick={defineTeacher} 
           
        /></p>
        
        <p>Student <input
          type="radio"
          name="role"
          className="userStatus"
          value="Student" 
          onClick={defineTeacher} 
        

        /></p>
        
      </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Enter your Name:
          </label>
          <input
            type="text" 
            name="name" 
            onChange={handleChange} 
            value={formData.name}
            className="form-control-lg"
            id="exampleFormControlInput1"
            placeholder=""
          />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Enter your Email:
          </label>
          <input name="email" onChange={handleChange} value={formData.email} type="email" className="form-control-lg" placeholder="" />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Enter your phone no. :
          </label>
          <input type="number" onChange={handleChange} name="phone" value={formData.phone} className="form-control-lg" placeholder="" />
        </div>
         <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label" id="keyLabel">
            Enter Admin Key *
          </label>
          <input name="adminKey" onChange={handleChange} value={formData.adminKey} type="number" className="form-control-lg" placeholder="" />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Enter your password:
          </label>
          <input name="password" onChange={handleChange} value={formData.password} type="password" className="form-control-lg" placeholder="" />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Confirm your password:
          </label>
          <input type="password" className="form-control-lg" placeholder="" />
        </div>
        <button type="submit" className="signbtn">Sign up</button>
        <p id="login" onClick={handleClick}>
          Change to Login
        </p>
        
        </form>
      <h1 className="signup-header">Sign up to get Started</h1>

      <Footer />
    </>
  );
};

export default Signup;
