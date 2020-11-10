const express = require('express');
const router = express.Router();

const newsController = require('../controllers/newsController')
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/', newsController.get_home_news);
router.get('/category/:category', requireAuth, newsController.get_news_category);
router.get('/search/',requireAuth, newsController.get_news_search)

module.exports = router;