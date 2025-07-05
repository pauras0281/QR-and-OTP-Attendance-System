import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import AdminHome from "./components/Dashboard/AdminHome";
import StudentHome from "./components/Dashboard/StudentHome";
import AllAttendance from "./components/Attendance/AllAttendance";
import TeacherLectures from './components/TeacherLectures/TeacherLectures';
import StudentLectures from "./components/StudentLectures/StudentLectures";
import StudentAttendance from "./components/Attendance/StudentAttendance";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="app-container">
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admindash" element={<AdminHome />} />
        <Route path="/studentdash" element={<StudentHome />} />
        <Route path="/admin/attendance" element={<AllAttendance />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/all-lectures" element={<StudentLectures />} />
        <Route path="/admin/all-lectures" element={<TeacherLectures />} />

      </Routes>
    </Router>
  </div>
);
