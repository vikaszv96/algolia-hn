const express = require('express');

const router = express.Router();

// import controller methods
const { create, list, read, hist } = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');

router.post('/post', create);
router.get('/posts/:par', list);
router.get('/post/:slug', read);
router.get('/historyCall/:par', hist);

module.exports = router;
