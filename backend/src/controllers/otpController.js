import { db } from '../config/db.js'
import { generateToken } from '../utils/jwt.js' // your existing JWT generator

export const verifyOTP = async (req, res) => {
  const { userId, otp, role } = req.body

  try {
    // 1️⃣ Check OTP in database
    const [rows] = await db.query(
      'SELECT * FROM otp_verification WHERE user_id=? AND otp=? AND expires_at > NOW()',
      [userId, otp]
    )

    if (!rows.length) {
      return res.status(400).json({ message: 'Invalid or expired OTP' })
    }

    // 2️⃣ Mark user as verified (use role table)
    await db.query(`UPDATE ${role} SET verified=1 WHERE id=?`, [userId])

    // 3️⃣ Delete OTP record
    await db.query('DELETE FROM otp_verification WHERE user_id=?', [userId])

    // 4️⃣ Generate JWT token from correct table
    const [user] = await db.query(`SELECT * FROM ${role} WHERE id=?`, [userId])
    const token = generateToken({...user[0],role:role})
   const r= role==="tutor"?"Tutor":"Student"
    // 5️⃣ Send token to frontend
    res.json({ message: 'OTP verified successfully please Login',token,user:{id:user[0].id,name:user[0].name,email:user[0].email,photo:user[0].profile_pic_url || null,role:r}} )
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message })
  }
}
