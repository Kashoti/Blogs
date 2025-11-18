import express from 'express';
import Post from '../models/post.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';  
const router = express.Router();

// get all posts
router.get('/', verifyToken,async (req, res) => {
  try{
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).json({ posts });
  }catch(error){
    res.status(500).json({
      error: 'Failed to fetch posts',
      details: error.message
    });
  } 
});

// compose a new post

router.post('/compose', verifyToken, requireRole('admin'), async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content
  });
  try{
    await newPost.save();
    res.status(200).json({newPost });

  }catch(error){
    res.status(500).json({
      error: 'Failed to create post',
      details: error.message
    });
  }
});

// view a single post
router.get('/posts/:id',verifyToken, async (req, res) => {
  try{
    const singlePost = await Post.findById(req.params.id);
    if(singlePost){
      res.status(200).json({ singlePost });
    }else{
      res.status(404).json({
        error: 'Post not found'
      });
    } 


  }catch(error){    res.status(500).json({
      error: 'Failed to fetch the post',
      details: error.message
    });
  } 
});

// update a post

router.patch('/posts/:id', verifyToken, requireRole('admin'), async (req, res) => {
  try{
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );  
    if(updatedPost){
      res.status(200).json({ updatedPost });
    } else{
      res.status(404).json({
        error: 'Post not found'
      });
    }
  }catch(error){
    res.status(500).json({
      error: 'Failed to update the post',
      details: error.message
    });
  }
});

// delete a post
router.delete('/posts/:id',verifyToken, requireRole('admin'), async (req, res) => {
  try{
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if(deletedPost){
      res.status(200).json({ deletedPost });
    } else{
      res.status(404).json({
        error: 'Post not found'
      });
    }
  }catch(error){
    res.status(500).json({
      error: 'Failed to delete the post',
      details: error.message
    });
  }
});

export default router;