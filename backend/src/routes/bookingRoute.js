import express from 'express';
import { protect } from '../middlewares/userMiddleware.js';
import { createBooking, getBookingsByStudent, getBookingsByTutor, updateBookingStatus } from '../controllers/bookingController.js';

const router = express.Router();
router.post('/create', protect, createBooking);
router.get('/student', protect, getBookingsByStudent);
router.get('/tutor', protect, getBookingsByTutor);
router.put('/update-status/:id', protect, updateBookingStatus);
export default router;