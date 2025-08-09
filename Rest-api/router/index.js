const router = require('express').Router();
const users = require('./users');
const parts = require('./parts');
const comments = require('./comments');
const likes = require('./likes');
const test = require('./test');
const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/parts', parts);
router.use('/comments', comments);
router.use('/likes', likes);
router.use('/test', test);

module.exports = router;
