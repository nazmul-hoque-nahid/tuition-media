import {createApplication,getStudentApplications,getTutorApplications,updateApplicationStatus} from '../controllers/applicationController.js';
import {protect,authorizeRoles} from '../middlewares/userMiddleware.js';
import express from 'express';

const router = express.Router();
router.post('/apply', protect, authorizeRoles('Tutor'), createApplication);
router.get('/tutor', protect, authorizeRoles('Tutor'), getTutorApplications);
router.get('/student', protect, authorizeRoles('Student'), getStudentApplications);
router.put('/update-status/:id', protect, authorizeRoles('Student'), updateApplicationStatus);
export default router;