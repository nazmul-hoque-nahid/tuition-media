// controllers/tutorController.js
import { db } from '../../config/db.js';

// Search tutors API
export const searchTutors = async (req, res) => {
  try {
    const { institute, city, studentLat, studentLng, maxDistance, gender } = req.query;

    // Base query
    let sql = `SELECT id, name, institute, city, profile_pic_url, latitude, longitude, gender FROM tutor WHERE 1=1`;
    const values = [];

    // Filter by institute
    if (institute) {
      sql += ` AND institute = ?`;
      values.push(institute);
    }
     if(gender){
      sql+= ` AND gender = ?`;
      values.push(gender);
     }
    // Filter by city
    if (city) {
      sql += ` AND city = ?`;
      values.push(city);
    }

    // Distance filtering for students
    if (studentLat && studentLng && maxDistance) {
      // Haversine formula for distance in km
      sql += ` AND (
        6371 * acos(
          cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) +
          sin(radians(?)) * sin(radians(latitude))
        )
      ) <= ?`;
      values.push(Number(studentLat), Number(studentLng), Number(studentLat), Number(maxDistance));
    }

    const [rows] = await db.query(sql, values);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
