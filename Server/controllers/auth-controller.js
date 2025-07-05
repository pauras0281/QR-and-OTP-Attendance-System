      const express = require("express");
    const mongoose = require("mongoose");
    const User = require("../model/userModel.js");

    const secretKey = 12345;
    const getAllUser = async (req, res, next) => {
      let users;
      try {
        users = await User.find();
      } catch (error) {
        return console.log(error);
      }
      if (!users) {
        return res.status(404).json({ message: "No Users Found" });
      }
      return res.status(200).json({ users });
    };

    const getUserById = async (req, res, next) => {
      const {id} = req.params
      let users;
      try {
        user = await User.findById(id);
        console.log(user);
      } catch (error) {
        return console.log(error);
      }
      if (!user) {
        return res.status(404).json({ message: "No Users Found" });
      }
      return res.status(200).json({ user });
    };

    const getStudents = async (req, res) => {
      try {
          // Find all users with the role of 'Student'
          const students = await User.find({ role: 'Student' });
          
          // Return the list of students
          return res.status(200).json(students);
      } catch (error) {
          // Handle errors
          console.error('Error fetching student data:', error);
          return res.status(500).json({ message: 'Internal server error' });
      }
  };

    const Signup = async (req, res) => {
      const { name, email, password, phone, role, adminKey = "0" } = req.body;

      let existingUser;
      try {
        existingUser = await User.findOne({ email });

        if (existingUser) {
          return res.status(500).json({ message: "User Already Exists" });
        }
        if (role === "Teacher" && adminKey != secretKey) {
          console.log(adminKey);
          console.log(secretKey);
          return res.status(500).json({ message: "Enter valid admin key" });
        }

        const user = new User({
          name,
          email,
          password,
          phone,
          role,
          adminKey,
        });

        try {
          await user.save();
        } catch (err) {
          return console.log(err);
        }
        return res.status(201).json({ user });
      } catch (error) {
        console.log(error);
      }
    };

    const Login = async (req, res) => {
      const { email, password } = req.body;
      let existingUser;
      try {
        existingUser = await User.findOne({ email });  
        console.log(existingUser.password);
      } catch (err) {
        return res.status(500).json({ err });
      }
      if (!existingUser) {
        return res.status(404).json({ message: "Couldn't find User" });
      }
      if (password !== existingUser.password) {
        return res.status(400).json({message: "Wrong password"})   
      } 
      return res.status(200).json({ message: "Login successful", userId: existingUser._id, role: existingUser.role });
    };

    module.exports = { Signup, Login, getAllUser, getUserById, getStudents };
