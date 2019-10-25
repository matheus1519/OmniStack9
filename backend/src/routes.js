const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');


const sessionController = require('./controller/SessionController');
const spotController = require('./controller/SpotController');
const dashboardController = require('./controller/dashboardController');
const bookingController = require('./controller/bookingController');
const ApprovalController = require('./controller/ApprovalController');
const RejectionController = require('./controller/RejectionController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions',sessionController.store);

routes.get('/spots',spotController.index);
routes.post('/spots',upload.single('thumbnail'),spotController.store);

routes.get('/dashboard',dashboardController.show);

routes.post('/spots/:spot_id/bookings',bookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store)
routes.post('/bookings/:booking_id/rejections', RejectionController.store)

module.exports = routes;