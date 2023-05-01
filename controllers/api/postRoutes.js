const router = require('express').Router();
const withAuth = require('../../utils/auth.js');
const { Post } = require('../../models');

router.post('/', withAuth, async (req, res) => {
  console.log('post route triggered');
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    console.log(newPost);

    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});


// Get a single post by id
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post by id
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!postData[0]) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.status(200).json({ message: 'Post updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post by id
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
