const express = require("express");
const router = express.Router();

const articleController = require("../controllers/articleController");
const { requireAuth } = require("../middleware/authMiddleware");

// protect route
router.get("/", requireAuth, articleController.get_saved_articles);
router.post("/save", requireAuth, articleController.post_save_articles);
router.delete("/delete", requireAuth, articleController.delete_saved_articles);

module.exports = router;
