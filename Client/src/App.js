import React from "react";
import Footer from "./components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";

function App() {
  const navigate = useNavigate();
  return (
    <>
    <div className="app">
      <h1>Attendify</h1>
      <h2>
        <Typewriter
          options={{
            strings: [
              "Shaping the Future of Attendance with QR & OTP Innovations",
              "Revolutionizing Attendance with QR & OTP Integration", " Modernizing Attendance with QR & OTP Security", "Transforming Attendance Tracking with QR &OTP"
            ],
            autoStart: true, 
            delay:40, 
            deleteSpeed: 2,
            loop: true,
          }}
        />
      </h2>

      <button
        onClick={() => {
          navigate("/signup");
        }}
        type="button"
        className="btn sbtn btn-outline-dark"
      >
        Sign Up
      </button>
      <button
        onClick={() => {
          navigate("/login");
        }}
        type="button"
        className="btn btn-dark"
      >
        Login
      </button>

      
    </div>
    <Footer />
    </>
  );
}

export default App;
