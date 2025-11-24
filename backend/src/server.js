import express from 'express'
import tutorRouter from './routes/tutorRoute.js'
import studentRoute from './routes/studentRoute.js'
import adminRouter from './routes/adminRoute.js'
import postRouter from './routes/postRoute.js'
import bookingRoute from './routes/bookingRoute.js'
import applicationRoute from './routes/applicationRoute.js'
import cors from 'cors'
const app=express()
app.use("/uploads", express.static("src/uploads"));
app.use(express.json())
const allowedOrigins = [
  "http://localhost:5173", // local frontend
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow non-browser requests like Postman
    if(allowedOrigins.includes(origin)){
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use('/api/tutor',tutorRouter)
app.use('/api/student',studentRoute)
app.use('/api/admin',adminRouter)
app.use('/api/post',postRouter)
app.use('/api/booking',bookingRoute)
app.use('/api/application', applicationRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT)