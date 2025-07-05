const express = require('express');
const subRouter = express.Router();
const subController = require('../controllers/sub-controller')

// Define routes
subRouter.get('/', subController);
// lectureRouter.get('/lectures', lectureController.getAllLectures);
// lectureRouter.get('/lectures/:id', lectureController.getLectureById);

// Export router
module.exports = subRouter;
