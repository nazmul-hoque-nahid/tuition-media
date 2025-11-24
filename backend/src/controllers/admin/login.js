import {db} from '../../config/db.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/jwt.js';

export const login = async (req, res) => {
    const { email, password } = req.body;
      if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
try{
  const [rows] = await db.query('SELECT * FROM admin WHERE email=?', [email]);
    if (!rows.length) return res.status(404).json({ message: 'User not found' });
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return  res.status(400).json({ message: 'Password invalid' });
  const userData = {id:user.id,email:user.email,name:user.name};
    res.status(200).json({user:userData,token: generateToken({id: user.id, role: 'Admin'})});
}catch(error){
    res.status(500).json({message:'Server Error'})
}
}