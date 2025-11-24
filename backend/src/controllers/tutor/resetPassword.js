import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { db } from '../../config/db.js';
export const resetPassword = async (req, res) => {
  const { token, password } = req.body;  // FIXED

  try {
    const [rows] = await db.query(
      'SELECT * FROM password_resets WHERE token=? AND expires_at > NOW()',
      [token]
    );

    if (!rows.length)
      return res.status(400).json({ message: 'Invalid or expired token' });

    const userId = rows[0].user_id;

    const hashed = await bcrypt.hash(password, 10);

    await db.query('UPDATE tutor SET password=? WHERE id=?', [hashed, userId]);

    await db.query('DELETE FROM password_resets WHERE token=?', [token]);

    res.json({ message: 'Password updated successfully' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};