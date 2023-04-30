const router = require('express').Router();
const { Post } = require('../../models');

// Get all posts for logged in user
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    
    res.render('dashboard', { 
      posts, 
      logged_in: req.session.logged_in,
      on_dashboard: true,
      user: req.session.user,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get the form to create a new post
router.get('/new', (req, res) => {
  res.render('new-post', { logged_in: req.session.logged_in });
});

// Create a new post
router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: { id: req.params.id, user_id: req.session.user_id },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get the form to update a post
router.get('/:id/edit', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('edit-post', { post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: { id: req.params.id, user_id: req.session.user_id },
      }
    );

    if (!postData[0]) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
