const express = require("express");
const router = express.Router();

const articleController = require("../controllers/articleController");

router.get("/", articleController.get_saved_articles);

module.exports = router;
