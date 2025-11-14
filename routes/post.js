import express from 'express';
import  Post  from '../models/Post.js';


const router = express.Router();


//  Home - all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.render('home.ejs', { posts });
  } catch (err) {
    res.status(500).send('Error retrieving posts');
  }
});

//  Compose - show form
router.get('/compose', (req, res) => {
  res.render('compose.ejs');
});

// Compose - save new post
router.post('/compose', async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content
  });
  try {
    await newPost.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error saving post');
  }
});

// View single post
router.get('/posts/:id', async (req, res) => {
  try {
    const singlePost = await Post.findById(req.params.id);
    if (singlePost) {
      res.render('post.ejs', { post: singlePost });
    } else {
      res.status(404).send('Post not found');
    }
  } catch (err) {
    res.status(500).send('Error retrieving post');
  }
});


router.get('/edit/:id', async (req, res) => {
  try{
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).send('Post not found');
    res.render('edit.ejs', {post});

  } catch (error){
    res.status(500).send('error loading edit form');
  }

});

router.post('/edit/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    await Post.findByIdAndUpdate(req.params.id, { title, content });
    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    res.status(500).send('Error updating post');
  }
})


// Delete post
router.post('/delete/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error deleting post');
  }
});


export default router;
