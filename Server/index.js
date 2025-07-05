const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')  

const userRouter = require('./routes/auth-routes')
const lectureRouter = require('./routes/lecture-routes')
const subRouter = require('./routes/sub-routes')



// Create Express app

const app = express();

// Middleware
app.use(cors())
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://wenpauras:wen123pauras@cluster0.rfdwz1v.mongodb.net/attendanceDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use('/api/user', userRouter);
app.use('/api/lectures', lectureRouter);
app.use('/api/sub', subRouter);

// Define server port
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
