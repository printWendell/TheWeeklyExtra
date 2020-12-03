const express = require("express");
const router = express.Router();

const newsController = require("../controllers/newsController");
// temporarily remove middleware for testing
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/", newsController.get_home_news);
router.get("/category/:category", newsController.get_news_category);
router.get("/search/", newsController.get_news_search);

module.exports = router;
