import "./cron/cronJobs.js";
import express from 'express';
import mongoose from 'mongoose';  
import dotenv from 'dotenv';
import postRoutes from './routes/post.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/auth', authRoutes);
app.use( postRoutes);





const startServer = async () => {
  try { 
    await  mongoose.connect(process.env.MONGODB_URL)
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
     console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });

  }catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } 
}


startServer();

 





