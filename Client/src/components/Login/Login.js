import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./index.css";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const sendRequest = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/user/login', formData);
      const data =await response.data
      console.log(data);

      // Extract user role from response data
      const { role, userId } = response.data;

      sessionStorage.setItem('userRole', role);
    sessionStorage.setItem('userId', userId);

      // Redirect to the appropriate dashboard based on user role
      if (role === 'Student') {
        navigate('/studentdash');
      } else if (role === 'Teacher') {
        navigate('/admindash');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendRequest()
    
  };

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <>
  <Header />
  <div className="lpage">
      <div className="login-form" id="lgfm">
        <form onSubmit={handleSubmit} >
        <h1 className="login-header">Login</h1>
        <div className="mb-3">
          <input type="email" name="email" value={formData.email} className="form-control-lg" onChange={handleChange} placeholder="email" />
        </div>

        <div className="mb-3">
          <input
            type="password" 
            name="password" 
            value={formData.password}
            className="form-control-lg"
            placeholder="password" 
            onChange={handleChange}
          />
        </div>
        <button className="loginbutton" type="submit">Login</button>
        </form>
        <p id="signup" onClick={handleClick}>
          Change to Sign Up
        </p>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
