const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  lectures: [{
    type: mongoose.Types.ObjectId,
    ref: "Lecture"
  }]
});


module.exports =  mongoose.model("Subject", subjectSchema);