import { db } from '../../config/db.js';

export const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT id, name, email, city, phone, profile_pic_url,gender FROM student WHERE id=?',
      [id]
    );
    if (!rows.length) return res.status(404).json({ message: 'student not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
