import express from 'express'
import {validateInput,validatePasswordChange} from '../middlewares/inputValidatorMiddleware.js'
import { createTutor } from '../controllers/tutor/createTutor.js'
import { deleteTutor } from '../controllers/tutor/deleteTutor.js'
import {searchTutors} from '../controllers/tutor/SearchTutor.js'
import { login } from '../controllers/tutor/login.js'
import { getAllTutors } from '../controllers/tutor/getAllTutors.js'
import { getTutorById } from '../controllers/tutor/getTutorById.js'
import { updateTutor } from '../controllers/tutor/updateTutor.js'
import { forgotPassword } from '../controllers/tutor/forgotPassword.js'
import { resetPassword } from '../controllers/tutor/resetPassword.js'
import { changePassword } from '../controllers/tutor/changePassword.js'
import { updateLocation } from '../controllers/tutor/updateLocation.js'
import { verifyOTP } from '../controllers/otpController.js'
import {upload} from '../middlewares/upload.js'
import {protect } from '../middlewares/userMiddleware.js'

const router=express.Router()

router.post('/register', validateInput, createTutor)
router.post('/verify-otp', verifyOTP)
router.post('/login', login)
router.get('/search', searchTutors)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.get('/getAllTutors', getAllTutors)
router.get("/public/:id", getTutorById);
router.put('/updateLocation', protect, updateLocation);
router.get('/:id', protect, getTutorById)
router.delete('/delete/:id', protect, deleteTutor)
router.put('/updateTutor', upload.single("profilePic"), updateTutor)
router.put('/changePassword', protect, validatePasswordChange, changePassword);
export default router