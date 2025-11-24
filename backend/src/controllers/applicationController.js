import { db } from "../config/db.js";

// Tutor applies to a post
export const createApplication = async (req, res) => {
  const { post_id } = req.body;
  const tutor_id = req.user.id;

  if (!post_id) return res.status(400).json({ message: "Post ID is required" });

  try {
    const [existing] = await db.query(
      "SELECT * FROM applications WHERE post_id=? AND tutor_id=?",
      [post_id, tutor_id]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: "Already applied to this post" });
    }

    await db.query(
      "INSERT INTO applications (id, post_id, tutor_id) VALUES (UUID(), ?, ?)",
      [post_id, tutor_id]
    );

    res.json({ message: "Application submitted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Tutor dashboard: get own applications
export const getTutorApplications = async (req, res) => {
  const tutor_id = req.user.id;
  try {
    const [applications] = await db.query(
      `SELECT a.id, a.status, a.applied_at,
              p.post_id, p.class, p.version, p.days_per_week, p.time, p.duration,
              p.city, p.salary, p.tutor_gender, p.method,
              s.name AS student_name, s.email AS student_email, s.phone AS student_phone, s.gender AS student_gender
       FROM applications a
       JOIN post p ON a.post_id = p.post_id
       JOIN student s ON p.student_id = s.id
       WHERE a.tutor_id = ?`,
      [tutor_id]
    );
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// Student dashboard: get applications for their posts
export const getStudentApplications = async (req, res) => {
  const student_id = req.user.id;
  try {
    const [applications] = await db.query(
      `SELECT a.id, a.status, a.applied_at,
              t.id AS tutor_id, t.name AS tutor_name, t.email AS tutor_email, t.phone AS tutor_phone, t.gender AS tutor_gender,
              p.post_id, p.class, p.version, p.city
       FROM applications a
       JOIN post p ON a.post_id = p.post_id
       JOIN tutor t ON a.tutor_id = t.id
       WHERE p.student_id = ?`,
      [student_id]
    );
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Student accepts/rejects an application
export const updateApplicationStatus = async (req, res) => {
  const { id } = req.params; // application id
  const { status } = req.body; // accepted or rejected

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    await db.query("UPDATE applications SET status=? WHERE id=?", [status, id]);
    res.json({ message: `Application ${status}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
