import {db} from '../../config/db.js';


export const getTutorById = async (req, res) => {
  const { id } = req.params;
  try {
    // 1️⃣ Get tutor basic info
    const [rows] = await db.query(
      `SELECT id, name, email, institute, gender, yearsOfExperience, city, phone, profile_pic_url, bio, latitude, longitude
       FROM tutor WHERE id = ?`,
      [id]
    );

    if (!rows.length) return res.status(404).json({ message: 'Tutor not found' });

    const tutor = rows[0];

    // 2️⃣ Get subjects taught by this tutor
    const [subjectRows] = await db.query(
      `SELECT s.name 
       FROM subjects s
       JOIN tutor_subjects ts ON s.sub_id = ts.sub_id
       WHERE ts.tutor_id = ?`,
      [id]
    );
    const subjects = subjectRows.map(s => s.name);

    // 3️⃣ Get classes taught by this tutor
    const [classRows] = await db.query(
      `SELECT c.name 
       FROM classes c
       JOIN tutor_class tc ON c.class_id = tc.class_id
       WHERE tc.tutor_id = ?`,
      [id]
    );
    const classes = classRows.map(c => c.name);

    // 4️⃣ Return combined result
    res.json({
      ...tutor,
      subjects,
      classes
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};