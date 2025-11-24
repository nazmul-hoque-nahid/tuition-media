import express from 'express'
import {validateInput,validatePasswordChange} from '../middlewares/inputValidatorMiddleware.js'
import { createStudent } from '../controllers/student/register.js'
import { deleteStudent } from '../controllers/student/deleteStudent.js'
import { login } from '../controllers/student/login.js'
import { getStudentById } from '../controllers/student/getStudentById.js'
import { forgotPassword } from '../controllers/student/forgotPassword.js'
import { resetPassword } from '../controllers/student/resetPassword.js'
import { updateStudent } from '../controllers/student/updateStudent.js'
import { changePassword } from '../controllers/student/changePassword.js'
import { updateLocation } from '../controllers/student/updateLocation.js'
import {upload} from '../middlewares/upload.js'
import { verifyOTP } from '../controllers/otpController.js'
import {protect } from '../middlewares/userMiddleware.js'
const router=express.Router()

router.post('/register', validateInput, createStudent)
router.post('/verify-otp', verifyOTP)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.put('/updateLocation', protect, updateLocation);
router.put('/updateStudent', upload.single("profilePic"), updateStudent)
router.put('/changePassword', protect, validatePasswordChange, changePassword);
router.get('/:id', protect, getStudentById)
router.delete('/delete/:id', protect, deleteStudent)
export default router;