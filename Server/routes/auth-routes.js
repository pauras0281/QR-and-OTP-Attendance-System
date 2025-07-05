const express = require('express')
const {Signup, Login, getAllUser, getUserById, getStudents} = require("../controllers/auth-controller")

const userRouter = express.Router()

userRouter.get("/", getAllUser)
userRouter.post("/signup", Signup)
userRouter.post("/login", Login)
userRouter.get("/:id", getUserById)

userRouter.get('/students/allstudents', getStudents)




module.exports = userRouter

