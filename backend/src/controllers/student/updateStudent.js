import { db } from "../../config/db.js";

export const updateStudent = async (req, res) => {
  const { id, name, email, phone, city, gender } = req.body;

  if (!id) return res.status(400).json({ message: "ID is required" });

  let updates = [];
  let values = [];

  if (name !== undefined && name !== "") {
    updates.push("name = ?");
    values.push(name);
  }

  if (email !== undefined && email !== "") {
    updates.push("email = ?");
    values.push(email);
  }

  if (phone !== undefined && phone !== "") {
    updates.push("phone = ?");
    values.push(phone);
  }

  if (city !== undefined && city !== "") {
    updates.push("city = ?");
    values.push(city);
  }

  if (gender !== undefined && gender !== "") {
    updates.push("gender = ?");
    values.push(gender);
  }

  // Handle profile picture
  if (req.file) {
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    updates.push("profile_pic_url = ?");
    values.push(imageUrl);
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  const sql = `UPDATE student SET ${updates.join(", ")} WHERE id = ?`;
  values.push(id);

  try {
    // Run the update
    await db.query(sql, values);

    // Fetch all relevant fields including profile_pic_url
 const [rows] = await db.query(
  "SELECT * FROM student WHERE id = ?",
  [id]
);

if (!rows.length) return res.status(404).json({ message: "Student not found" });

res.json({rows: rows[0] });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
