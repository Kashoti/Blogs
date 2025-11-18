import mongoose from 'mongoose';

const postschema = new mongoose.Schema({
    title: {
    type: String, 
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

const Post = mongoose.models.Post || mongoose.model('Post', postschema);  

export default Post;