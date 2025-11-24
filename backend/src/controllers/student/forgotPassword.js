import crypto from 'crypto';
import { db } from '../../config/db.js';
import { sendResetEmail } from '../../utils/email.js';

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const [users] = await db.query('SELECT id FROM student WHERE email=?', [email]);
    if (!users.length)
      return res.status(404).json({ message: 'Email not found' });

    const Id = users[0].id;

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    await db.query(
      'INSERT INTO password_resets(id, user_id, token, expires_at) VALUES (UUID(), ?, ?, ?)',
      [Id, token, expires]
    );

    // IMPORTANT — USE FRONTEND URL (5173)
    const resetLink = `http://localhost:5173/reset-password?token=${token}`;

    await sendResetEmail(email, resetLink);

    res.json({ message: 'Password reset link sent' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
