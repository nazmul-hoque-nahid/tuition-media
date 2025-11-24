import bcrypt from 'bcryptjs'
import { db } from '../../config/db.js'
import { generateToken } from '../../utils/jwt.js'

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch user from DB
    const [rows] = await db.query('SELECT * FROM tutor WHERE email=? and verified=1', [email]);

    if (!rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Password invalid' });

    // Prepare user object to send to frontend
    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.profile_pic_url || null, // fallback to null if not set
      role: 'Tutor',
      gender:user.gender
    };

    // Send response
    res.status(200).json({
      user: userInfo,
      token: generateToken({id: user.id, role: 'Tutor'}), // token contains only id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
}