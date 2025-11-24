// controllers/adminController.js
import { db } from "../../config/db.js";

export const getStats = async (req, res) => {
  try {
    const [[{ total_students }]] = await db.query(
      "SELECT COUNT(*) AS total_students FROM student"
    );
    const [[{ total_tutors }]] = await db.query(
      "SELECT COUNT(*) AS total_tutors FROM tutor"
    );
    const [[{ total_posts }]] = await db.query(
      "SELECT COUNT(*) AS total_posts FROM post"
    );

    // posts open/filled
    const [[{ open_posts }]] = await db.query(
      "SELECT COUNT(*) AS open_posts FROM post WHERE status = 'OPEN'"
    );
    const [[{ filled_posts }]] = await db.query(
      "SELECT COUNT(*) AS filled_posts FROM post WHERE status = 'FILLED'"
    );

    // applications counts
    const [[{ total_applications }]] = await db.query(
      "SELECT COUNT(*) AS total_applications FROM applications"
    );
    const [[{ pending_apps }]] = await db.query(
      "SELECT COUNT(*) AS pending_apps FROM applications WHERE status = 'pending' OR status = 'PENDING'"
    );
    const [[{ accepted_apps }]] = await db.query(
      "SELECT COUNT(*) AS accepted_apps FROM applications WHERE status = 'accepted' OR status = 'ACCEPTED'"
    );
    const [[{ rejected_apps }]] = await db.query(
      "SELECT COUNT(*) AS rejected_apps FROM applications WHERE status = 'rejected' OR status = 'REJECTED'"
    );

    res.json({
      total_students,
      total_tutors,
      total_posts,
      open_posts,
      filled_posts,
      total_applications,
      pending_apps,
      accepted_apps,
      rejected_apps,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/admin/students
 * Return all students (id, name, email, city, gender, created_at)
 */
export const getAllStudents = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, email, phone, city, gender, profile_pic_url, created_at FROM student ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/admin/tutors
 */
export const getAllTutors = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, email, phone, city, institute, yearsOfExperience, gender, profile_pic_url, created_at FROM tutor ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/admin/posts
 * Return list of posts with student info
 */
export const getAllPosts = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT p.post_id, p.student_id, p.class, p.version, p.days_per_week, p.time, p.duration,
              p.gender AS student_gender, p.students, p.salary, p.city, p.tutor_gender, p.status, p.created_at, p.method,
              s.name AS student_name, s.email AS student_email
       FROM post p
       LEFT JOIN student s ON p.student_id = s.id
       ORDER BY p.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/admin/applications
 * Return application list with post + tutor + student summary
 */
export const getAllApplications = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT a.id, a.post_id, a.tutor_id, a.status AS application_status, a.applied_at,
              p.class, p.version, p.city, p.time, p.duration, p.tutor_gender,
              t.name AS tutor_name, t.email AS tutor_email, t.phone AS tutor_phone, t.gender AS tutor_gender,
              s.id AS student_id, s.name AS student_name, s.email AS student_email
       FROM applications a
       JOIN post p ON a.post_id = p.post_id
       LEFT JOIN tutor t ON a.tutor_id = t.id
       LEFT JOIN student s ON p.student_id = s.id
       ORDER BY a.applied_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE /api/admin/delete/:type/:id
 * type = student | tutor
 */
export const deleteUser = async (req, res) => {
  try {
    const { type, id } = req.params;
    if (!id || (type !== "student" && type !== "tutor")) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const table = type === "student" ? "student" : "tutor";
    await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
    res.json({ message: `${type} deleted successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
