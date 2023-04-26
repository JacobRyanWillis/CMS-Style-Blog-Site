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
