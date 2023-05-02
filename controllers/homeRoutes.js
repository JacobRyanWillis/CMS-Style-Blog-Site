const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: Comment, include: [User] }, User],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", { 
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Display a single post and its comments
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: Comment, include: [User] }, User],
    });
    const post = postData.get({ plain: true });

    // Add is_author property to each comment object
    post.comments.forEach(comment => {
      comment.is_author = req.session.user_id === comment.user_id;
    });

    res.render('single-post', { 
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



// Display the form for editing an existing post
router.get('/edit-post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: User,
    });
    const post = postData.get({ plain: true });

    if (post.user_id !== req.session.user_id) {
      res.status(403).json('You are not authorized to edit this post');
    } else {
      res.render('edit-post', { 
        post,
        logged_in: req.session.logged_in 
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Post }, { model: Comment, include: [Post] }],
    });

    const user = userData.get({ plain: true });
    res.render('dashboard', { 
      user, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/homepage', (req,res) => {
  res.render('homepage');
});

router.get('/new-post', (req, res) => {
  res.render('new-post', { logged_in: req.session.logged_in });
});

router.get("/login", (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
    res.render("login");
  });


module.exports = router;

