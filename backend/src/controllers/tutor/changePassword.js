import bcrypt from 'bcryptjs';
import { db } from '../../config/db.js';

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { id } = req.user;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Both current and new password are required" });
  }

  try {
    // 1. Get user
    const [student] = await db.query(
      "SELECT password FROM tutor WHERE id = ?",
      [id]
    );

    if (!student.length) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    const hashedPassword = student[0].password;

    // 2. Check current password
    const isCorrect = await bcrypt.compare(currentPassword, hashedPassword);
    if (!isCorrect) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // 3. Hash new password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Update password
    await db.query(
      "UPDATE tutor SET password = ? WHERE id = ?",
      [newHashedPassword, id]
    );

    return res.json({ message: "Password updated successfully!" });

  } catch (err) {
    return res.status(500).json({ message: "Server error while updating password" });
  }
};