import {db} from '../../config/db.js';

export const  updateLocation=async (req, res) => {
  const { latitude, longitude } = req.body;

  await db.query(
    "UPDATE tutor SET latitude=?, longitude=? WHERE id=?",
    [latitude, longitude, req.user.id]
  );

  res.json({ message: "Location updated" });
};