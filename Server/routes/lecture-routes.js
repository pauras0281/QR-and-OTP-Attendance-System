    const express = require('express');
    const lectureRouter = express.Router();
    const lectureController = require('../controllers/lecture-controller');

    // Define routes
    lectureRouter.get('/', lectureController.getAllLectures);
    lectureRouter.post('/create', lectureController.createLecture);
    lectureRouter.get('/:id', lectureController.getLectureById);


    lectureRouter.post('/lecture/scanqr', lectureController.scanQRCode);
    lectureRouter.post('/lecture/enterotp', lectureController.enterOTP);

    // Export router
    module.exports = lectureRouter;
