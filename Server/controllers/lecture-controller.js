const Lecture = require("../model/lectureModel");
const Subject = require("../model/sub");
const User = require("../model/userModel")

const generateQRCode = require("./qrController");
const generateOTP = require("./otpController.js");

// Define controller methods
const lectureController = {
  createLecture: async (req, res) => {
    try {
      const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
      const expiryTimestamp = new Date(Date.now() + thirtyMinutes);

      const { lectureName, createdBy, subject } = req.body;

      // Generate QR code and OTP
      const otp = generateOTP(); // Assuming generateOTP() generates the OTP

      const newLecture = new Lecture({
        lectureName,
        createdBy,
        subject,
        otp,
        otpExpiry: expiryTimestamp,
        qrCodeExpiry: expiryTimestamp,
      });

      await newLecture.save();
      console.log(newLecture);

      newLecture.qrCode = `lectureId:${newLecture._id}`;


      await newLecture.save();

      const list = Lecture.find()
      console.log(list);

      const subArray = await Subject.findById(subject);
      subArray.lectures.push(newLecture);
      await subArray.save();

      // Respond with success message
      res.status(201).json({ message: 'Lecture created successfully', lecture: newLecture });

      // Schedule task to mark attendance after lecture ends
      setTimeout(async () => {
        try {
          // Fetch the newly created lecture by ID
          const lecture = await Lecture.findById(newLecture._id).populate('attendedStudents');

          // Fetch all students with the role of a student
          const enrolledStudents = await User.find({ role: 'student' });

          // Identify students who attended the lecture
          const attendedStudents = lecture.attendedStudents.map(student => student._id);

          // Identify students who didn't mark attendance
          const absentStudents = enrolledStudents.filter(student => !attendedStudents.includes(student._id));

          // Update the lecture document with absent students
          lecture.absentStudents = absentStudents.map(student => student._id);

          // Save the updated lecture document
          await lecture.save();
        } catch (error) {
          console.error('Error marking attendance:', error);
        }
      }, thirtyMinutes);
    } catch (error) {
      console.error('Error creating lecture ...:', error);
      res.status(500).json({ message: error });
    }
  },


  // Get all lectures
  getAllLectures: async (req, res) => {
    try {
      // Retrieve all lectures from the database
      const lectures = await Lecture.find()
        .populate({ path: 'createdBy', select: 'name' }) // Populate createdBy field with the name from the users collection
        .populate({ path: 'subject', select: 'name' });

      // Respond with lectures
      res.status(200).json({ lectures });
    } catch (error) {
      // Handle errors
      console.error("Error fetching lectures:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get a single lecture by ID
  getLectureById: async (req, res) => {
    const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
    try {
      // Extract lecture ID from request parameters
      const { id } = req.params;

      // Retrieve lecture from the database by ID
      const lecture = await Lecture.findById(id)
      // Check if lecture exists
      if (!lecture) {
        return res.status(404).json({ message: 'Lecture not found' });
      }

      const qrImage = await generateQRCode(`lectureId:${id}`);

    

      // Save the updated lecture
      await lecture.save();
      const updatedLecture = await Lecture.findById(id)

      // Respond with the lecture
      res.status(200).json({ updatedLecture,qrImage });
    } catch (error) {
      // Handle errors
      console.error('Error fetching lecture by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },



  // 
  // Controller function to handle scanning QR code
scanQRCode: async (req, res) => {
  try {
    const { scannedData, userId } = req.body;
    console.log(scannedData);

    // Find the lecture with the provided QR code
    const lecture = await Lecture.findOne({ qrCode: scannedData });
    console.log(lecture);
    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }

    // Check if the QR code is not expired
    if (lecture.qrCodeExpiry < new Date()) {
      return res.status(400).json({ message: 'QR code expired' });
    }

    // Check if the user has already marked attendance
    if (lecture.attendedStudents.includes(userId)) {
      return res.status(400).json({ message: 'You have already marked attendance' });
    }

    // Mark the user as attended
    lecture.attendedStudents.push(userId);
    await lecture.save();

    return res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Error scanning QR code:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
},

// Controller function to handle entering OTP
enterOTP: async (req, res) => {
  try {
    const { enteredOTP, userId } = req.body;

    // Find the lecture with the provided OTP
    const lecture = await Lecture.findOne({ otp: enteredOTP });

    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }

    // Check if the OTP is not expired
    if (lecture.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    // Check if the user has already marked attendance
    if (lecture.attendedStudents.includes(userId)) {
      return res.status(400).json({ message: 'You have already marked attendance' });
    }

    // Mark the user as attended
    lecture.attendedStudents.push(userId);
    await lecture.save();

    return res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Error entering OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

};

// Export the controller
module.exports = lectureController;
