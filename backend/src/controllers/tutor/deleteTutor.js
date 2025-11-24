

import { db } from '../../config/db.js';

export const deleteTutor=async(req,res)=>{
  const id=req.params.id;
  try{
    const [result]=await db.query('DELETE FROM tutor WHERE id=?',[id]);
    if(result.affectedRows===0){
      return res.status(404).json({message:'Tutor not found'});
    }
    res.json({message:'Tutor deleted successfully'});
  }catch(err){
    res.status(500).json({message:'Server error: '+err.message});
  }
  
}