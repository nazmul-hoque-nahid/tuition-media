import {db} from '../config/db.js'
import { v4 as uuidv4 } from 'uuid';
export const createPost = async (req, res) => {
  try {
    const {
      class: cls,
      version,
      days_per_week,
      time,
      duration,
      gender,
      students,
      salary,
      city,
      tutor_gender,
      method,
      subjects // <-- new: array from frontend
    } = req.body;

    // Validate required fields
    if (
      !cls ||
      !version ||
      !days_per_week ||
      !time ||
      !duration ||
      !gender ||
      !students ||
      !salary ||
      !city ||
      !tutor_gender ||
      !method
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate version
    const allowedVersions = ['Bangla', 'English', 'British Curriculum'];
    if (!allowedVersions.includes(version)) {
      return res.status(400).json({ message: 'Invalid version selected' });
    }

    // Create post_id
    const postId = uuidv4();

    // Insert into post table
    const query = `
      INSERT INTO post 
      (post_id, student_id, class, version, days_per_week, time, duration, gender, students, salary, city, tutor_gender, method)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      postId,
      req.user.id,
      cls,
      version,
      days_per_week,
      time,
      duration,
      gender,
      students,
      salary,
      city,
      tutor_gender,
      method
    ];

    await db.query(query, values);

    // ----------------------
    // Handle post_subject
    // ----------------------
    if (Array.isArray(subjects) && subjects.length > 0) {
      // Fetch existing subject IDs
      const [existingSubjects] = await db.query(
        "SELECT sub_id, name FROM subjects WHERE name IN (?)",
        [subjects]
      );

      const existingNames = existingSubjects.map(s => s.name);
      const allSubjectIds = existingSubjects.map(s => s.sub_id);

      // Create new subjects if not exist
      for (const sub of subjects) {
        if (!existingNames.includes(sub)) {
          const newId = uuidv4();
          await db.query("INSERT INTO subjects(sub_id, name) VALUES (?, ?)", [newId, sub]);
          allSubjectIds.push(newId);
        }
      }

      // Insert into post_subject table
      if (allSubjectIds.length > 0) {
        const postSubjectValues = allSubjectIds.map(subId => [postId, subId]);
        await db.query(
          "INSERT INTO post_subject(post_id, sub_id) VALUES ?",
          [postSubjectValues]
        );
      }
    }

    res.status(201).json({ message: 'Post created successfully', postId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
export const getAllPosts = async (req, res) => {
  try {
    // Fetch posts with aggregated subjects
    const [rows] = await db.query(`
      SELECT 
        p.*,
        DATE_FORMAT(p.created_at, "%Y-%m-%d %H:%i") AS created_at_formatted,
        IFNULL(GROUP_CONCAT(s.name SEPARATOR ', '), '') AS subjects
      FROM post p
      LEFT JOIN post_subject ps ON p.post_id = ps.post_id
      LEFT JOIN subjects s ON ps.sub_id = s.sub_id
      GROUP BY p.post_id
      ORDER BY p.created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const searchPosts = async (req, res) => {
  try {
    const {
      city,
      class: cls,
      version,
      duration,
      gender,
      tutor_gender,
      minSalary,
      maxSalary,
      days_per_week,
      method
    } = req.query;

    let query = 'SELECT *, DATE_FORMAT(created_at, "%Y-%m-%d %H:%i") as created_at_formatted FROM post WHERE 1=1';
    const values = [];

    if (city) {
      query += ' AND city LIKE ?';
      values.push(`%${city}%`);
    }

    if (cls) {
      query += ' AND class = ?';
      values.push(cls);
    }

    if (version) {
      query += ' AND version LIKE ?';
      values.push(`%${version}%`);
    }

    if (duration) {
      query += ' AND duration = ?';
      values.push(duration);
    }

    if (gender) {
      query += ' AND gender = ?';
      values.push(gender);
    }

    if (tutor_gender) {
      query += ' AND tutor_gender = ?';
      values.push(tutor_gender);
    }

    if (minSalary) {
      query += ' AND salary >= ?';
      values.push(minSalary);
    }

    if (maxSalary) {
      query += ' AND salary <= ?';
      values.push(maxSalary);
    }

    if (days_per_week) {
      query += ' AND days_per_week = ?';
      values.push(days_per_week);
    }
        if (method) {
      query += ' AND method = ?';
      values.push(method);
    }
    // Optional: keep ordering by creation time
    query += ' ORDER BY created_at DESC';

    const [rows] = await db.query(query, values);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const closePost = async (req, res) => {
  const { postId } = req.params;
  const student_id = req.user.id; // who created the post

  try {
    // Ensure post belongs to this student
    const [post] = await db.query(
      "SELECT * FROM post WHERE post_id=? AND student_id=?",
      [postId, student_id]
    );

    if (!post.length)
      return res.status(403).json({ message: "You cannot close this post" });

    await db.query(
      "UPDATE post SET status='FILLED' WHERE post_id=?",
      [postId]
    );

    res.json({ message: "Post closed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
