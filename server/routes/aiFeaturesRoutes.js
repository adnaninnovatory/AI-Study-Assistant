const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const { generateSummary } = require("../controllers/summaryController");
const { generateMCQs } = require("../controllers/mcqController");
const { chatWithDocument } = require("../controllers/chatController");
const router = express.Router();

//////////////////////////////////////////////////////
// SUMMARY
//////////////////////////////////////////////////////
router.post("/summary", protect, generateSummary);

//////////////////////////////////////////////////////
// MCQs
//////////////////////////////////////////////////////
router.post("/mcq", protect, generateMCQs);

//////////////////////////////////////////////////////
// Chat
//////////////////////////////////////////////////////
router.post("/chat", protect, chatWithDocument);

module.exports = router;