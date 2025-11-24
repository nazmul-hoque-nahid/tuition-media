import {db} from '../config/db.js';

export const createBooking = async (req, res) => {
  const { tutor_id, date, time, message } = req.body;
  const student_id = req.user.id; // get from token

  if (!tutor_id || !date || !time) {
    return res.status(400).json({ message: "Tutor, date, and time are required" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO bookings (tutor_id, student_id, date, time, message) VALUES (?, ?, ?, ?, ?)",
      [tutor_id, student_id, date, time, message]
    );

    // Use result.insertId for AUTO_INCREMENT ID
    res.status(201).json({ message: "Booking created", bookingId: result.id });
  } catch (err) {
    console.error("SQL Error:", err); // log full error for debugging
    res.status(500).json({ message: "Failed to create booking", error: err.message });
  }
};


export const getBookingsByStudent = async (req, res) => {
  const studentId = req.user.id;
  try {
    const [rows] = await db.execute(
      `SELECT b.*, t.name AS tutor_name, t.email AS tutor_email, t.phone AS tutor_phone
       FROM bookings b
       JOIN tutor t ON b.tutor_id = t.id
       WHERE b.student_id = ?`,
      [studentId]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};




export const getBookingsByTutor = async (req, res) => {
  const tutorId = req.user.id;
  try {
    const [rows] = await db.execute(
      `SELECT b.*, s.name AS student_name,s.gender AS student_gender,s.city AS student_city, s.email AS student_email, s.phone AS student_phone
       FROM bookings b
       JOIN student s ON b.student_id = s.id
       WHERE b.tutor_id = ?
       order by b.date desc, b.time desc
       `,
      [tutorId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};


export const updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // accepted or rejected

    try {
        await db.execute('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Booking status updated' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update booking' });
    }
}