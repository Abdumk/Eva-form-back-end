const express = require("express");
const { getAnswer, postAnswer,editAnswer, deleteAnswer } = require("../controller/answerController");
// const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Get Answers for a Question
router.get("/answer/:question_id", getAnswer);

// Post Answers for a Question
router.post("/answer", postAnswer);



// from CO

// Edit Answer
 router.put("/answer/:answer_id",  editAnswer);

// Delete Answer
 router.delete("/answer/:answer_id",  deleteAnswer);
module.exports = router;
