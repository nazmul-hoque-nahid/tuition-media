import { v4 as uuidv4 } from "uuid";
import { db } from "../../config/db.js";
export const updateTutor = async (req, res) => {
  const {
    id,
    name,
    institute,
    yearsOfExperience,
    city,
    email,
    phone,
    bio,
    gender,
    classes,   // JSON array string
    subjects,
      // JSON array string
  } = req.body;

  if (!id) return res.status(400).json({ message: "ID is required" });

  let updates = [];
  let values = [];

  // -------------------
  // Update basic fields
  // -------------------
  if (name) updates.push("name = ?"), values.push(name);
  if (institute) updates.push("institute = ?"), values.push(institute);
  if (yearsOfExperience) updates.push("yearsOfExperience = ?"), values.push(Number(yearsOfExperience));
  if (city) updates.push("city = ?"), values.push(city);
  if (phone) updates.push("phone = ?"), values.push(phone);
  if (bio) updates.push("bio = ?"), values.push(bio);
  if (gender) updates.push("gender = ?"), values.push(gender);
  if (email) {
    try {
      const [existing] = await db.query(
        "SELECT id FROM tutor WHERE email = ? AND id != ?",
        [email, id]
      );
      if (existing.length) return res.status(400).json({ message: "Email already in use" });
      updates.push("email = ?"), values.push(email);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  // -------------------
  // Handle profile picture
  // -------------------
  if (req.file) {
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    updates.push("profile_pic_url = ?"), values.push(imageUrl);
  }

  // -------------------
  // Update tutor table
  // -------------------
  if (updates.length > 0) {
    const sql = `UPDATE tutor SET ${updates.join(", ")} WHERE id = ?`;
    values.push(id);
    try {
      await db.query(sql, values);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  // -------------------
  // Handle subjects
  // -------------------
  if (subjects) {
    try {
      const subjectsArray = JSON.parse(subjects); // convert string to array
      const cleanSubjects = subjectsArray.map(s => s.trim()).filter(Boolean);

      const [existingSubjects] = await db.query(
        "SELECT sub_id, name FROM subjects WHERE name IN (?)",
        [cleanSubjects]
      );

      const existingNames = existingSubjects.map(s => s.name);
      const allSubjectIds = existingSubjects.map(s => s.sub_id);

      // Create new subjects
      for (const sub of cleanSubjects) {
        if (!existingNames.includes(sub)) {
          const newId = uuidv4();
          await db.query("INSERT INTO subjects(sub_id, name) VALUES (?, ?)", [newId, sub]);
          allSubjectIds.push(newId);
        }
      }

      // Update tutor_subjects table
      await db.query("DELETE FROM tutor_subjects WHERE tutor_id = ?", [id]);
      if (allSubjectIds.length > 0) {
        const subjectValues = allSubjectIds.map(subId => [subId, id]);
        await db.query("INSERT INTO tutor_subjects(sub_id, tutor_id) VALUES ?", [subjectValues]);
      }
    } catch (err) {
      return res.status(500).json({ message: "Failed to update subjects: " + err.message });
    }
  }

  // -------------------
  // Handle classes
  // -------------------
  if (classes) {
    try {
      const classesArray = JSON.parse(classes); // convert string to array
      const cleanClasses = classesArray.map(c => c.trim()).filter(Boolean);

      const [existingClasses] = await db.query(
        "SELECT class_id, name FROM classes WHERE name IN (?)",
        [cleanClasses]
      );

      const existingNames = existingClasses.map(c => c.name);
      const allClassIds = existingClasses.map(c => c.class_id);

      // Create new classes
      for (const cls of cleanClasses) {
        if (!existingNames.includes(cls)) {
          const newId = uuidv4();
          await db.query("INSERT INTO classes(class_id, name) VALUES (?, ?)", [newId, cls]);
          allClassIds.push(newId);
        }
      }

      // Update tutor_class table
      await db.query("DELETE FROM tutor_class WHERE tutor_id = ?", [id]);
      if (allClassIds.length > 0) {
        const classValues = allClassIds.map(classId => [classId, id]);
        await db.query("INSERT INTO tutor_class(class_id, tutor_id) VALUES ?", [classValues]);
      }
    } catch (err) {
      return res.status(500).json({ message: "Failed to update classes: " + err.message });
    }
  }

  // -------------------
  // Return updated tutor
  // -------------------
  try {
    const [updatedRows] = await db.query(
      "SELECT id, name, gender, institute, yearsOfExperience, city, email, phone, bio, profile_pic_url FROM tutor WHERE id = ?",
      [id]
    );
    res.json(updatedRows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};