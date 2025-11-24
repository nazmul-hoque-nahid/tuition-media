import jwt from 'jsonwebtoken'

export const generateToken=(data)=>{
    return jwt.sign({id:data.id,role:data.role},process.env.JWT_SECRET,{expiresIn:'5d'})
};