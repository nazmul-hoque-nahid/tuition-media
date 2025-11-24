import {db} from '../../config/db.js'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
import { sendOTPEmail } from '../../utils/email.js'

export const createTutor = async (req, res) => {
  try {
    const { fullName, phone, email, password } = req.body
    const id = uuidv4()
    const hashed = await bcrypt.hash(password, 10)

    // Insert tutor as unverified
    await db.query(
      'INSERT INTO tutor(id,name,email,password,phone,verified) VALUES(?,?,?,?,?,?)',
      [id, fullName, email, hashed, phone, 0] // verified=0
    )

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000) // 6 digit
    const expiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Store OTP in table otp_verification (userId, otp, expiresAt)
    await db.query(
      'INSERT INTO otp_verification(user_id, otp, expires_at) VALUES(?,?,?)',
      [id, otp, expiry]
    )

    // Send OTP via email or SMS
    await sendOTPEmail(email, otp)

    // Return only userId, no token yet
    res.status(201).json({ message: "OTP sent to your email", userId: id })
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message })
  }
}