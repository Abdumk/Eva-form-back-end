const express = require("express");
const router = express.Router();

const {postQuestion,getAllQuestions,getQuestionAndAnswer,editQuestion, deleteQuestion} = require("../controller/questionController")

// get all questions
router.get("/question", getAllQuestions);


// get single question
router.get("/question/:question_id", getQuestionAndAnswer);

// post a question
router.post("/question", postQuestion);
// from copi

// Edit Question
router.put("/question/:question_id", editQuestion);

// Delete Question
router.delete("/question/:question_id", deleteQuestion);

module.exports = router;


