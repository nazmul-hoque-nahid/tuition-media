import {db} from '../../config/db.js'

export const deleteStudent=async(req,res)=>{
  const id=req.params.id;
  try{
    const [result]=await db.query('DELETE FROM student WHERE id=?',[id]);
    if(result.affectedRows===0){
      return res.status(404).json({message:'Student not found'});
    }
    res.json({message:'Student deleted successfully'});
  }catch(err){
    res.status(500).json({message:'Server error: '+err.message});
  }
  
}