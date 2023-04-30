const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/users', userRoutes);
router.use('/comment', commentRoutes);
router.use('/post', postRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;