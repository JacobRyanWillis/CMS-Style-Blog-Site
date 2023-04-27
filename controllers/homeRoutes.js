const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: Comment, include: [User] }, User],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", { posts });
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
    res.render('single-post', { post });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Display the form for creating a new post
router.get('/new-post', withAuth, (req, res) => {
  res.render('new-post');
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
      res.render('edit-post', { post });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get("/login", (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
    res.render("login");
  });
  

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;

//  combine signup/login handlebars and edit/new-post handlebars.