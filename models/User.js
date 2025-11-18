import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  email: { type: String, require: true, unique: true},
  password: {type: String, required: true, unique: true},
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
   
});

const User = mongoose.model('User', userschema);

export default User;