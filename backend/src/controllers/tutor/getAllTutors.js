import {db} from '../../config/db.js';

export const getAllTutors=async (req,res)=>{
try{
     const [tutors]=await db.query('SELECT id,name,institute,profile_pic_url,gender,yearsOfExperience,city FROM tutor where verified=1');
     res.status(200).json(tutors);
}catch(err){
     res.status(500).send("Server Err"+err.message)
}
}