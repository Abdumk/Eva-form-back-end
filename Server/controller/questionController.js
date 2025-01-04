const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");
const crypto = require("crypto");

// post questions / ask questions
async function postQuestion(req, res) {
  const { userid, title, description, tag } = req.body;
  // Create a new date object
  const currentTimestamp = new Date();

  // Adjust the time by UTC+3 hours
  const adjustedDate = new Date(
    currentTimestamp.getTime() + 3 * 60 * 60 * 1000
  );

  // Format the date as 'YYYY-MM-DD HH:mm:ss'
  const formattedTimestamp = adjustedDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  if (!userid || !title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }
  const questionid = crypto.randomBytes(10).toString("hex");
  try {
    await dbConnection.query(
      "insert into questions (questionid, userid, title, description, tag,createdAt) values ( ?, ?, ?, ?, ?,?)",
      [questionid, userid, title, description, tag, formattedTimestamp]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "question posted successfully" });
  } catch (err) {
    //    console.log(err);
    return res
      .status(500)
      .json({ message: "something went wrong, please try again later" + err });
  }
}

// get all questions
async function getAllQuestions(req, res) {
  try {
    const [questions] =
      await dbConnection.query(`SELECT q.questionid, q.title, q.description, q.createdAt, q.userid, u.username
FROM questions q
INNER JOIN users u ON q.userid = u.userid
ORDER BY q.createdAt DESC;
`);
    return res.status(StatusCodes.OK).json({
      message: questions,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "something went wrong, please try again later" });
  }
}

// get single question and answers
async function getQuestionAndAnswer(req, res) {
  const questionid = req.params.question_id;

  try {
    const [rows] = await dbConnection.query(
      `SELECT 
          q.questionid, 
          q.title, 
          q.description, 
          q.createdAt AS question_createdAt,
          u2.username as question_username,
          a.answerid, 
          a.userid AS answer_userid, 
          a.answer,
          a.createdAt,
          u.username as answer_username
       FROM 
          questions q   
       LEFT JOIN 
          answers a ON q.questionid = a.questionid
          LEFT JOIN users u on u.userid = a.userid
          left join users u2 on u2.userid = q.userid
       WHERE 
          q.questionid = ?
          order by a.createdAt desc
          `,
      [questionid]
    );

    // Check if the question exists
    if (rows.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Question not found" });
    } 
      // Reshape the data to include answers under the question
    const questionDetails = {
      id: rows[0].questionid,
      title: rows[0].title,
      description: rows[0].description,
      qtn_createdAt: rows[0].question_createdAt,
      qtn_username: rows[0].question_username,
      answers: rows
        .map((answer) => ({
          answerid: answer.answerid,
          userid: answer.answer_userid,
          username: answer.answer_username,
          answer: answer.answer,
          createdAt: answer.createdAt,
        }))
        .filter((answer) => answer.answerid !== null), // Filter out any null answers
    };

    res.status(StatusCodes.OK).json(questionDetails);
  
  } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error fetching question details" + error });
    }
// from CO
}

// Edit Question
async function editQuestion(req, res) {
  const { question_id } = req.params;
  const { title, description, userId } = req.body; // Ensure userId is passed

  try {
    const [questions] = await dbConnection.query("SELECT userid FROM questions WHERE questionid = ?", [question_id]);
    const question = questions[0]; // Fix: Access the first result properly
    console.log("Question", question);
    console.log("Question's UserID:", question?.userid);
    console.log("Request UserID:", userId);

    if (!question || question.userid !== userId) {
      return res.status(403).json({ message: "You are not authorized to edit this question" });
    }

    await dbConnection.query(
      "UPDATE questions SET title = ?, description = ? WHERE questionid = ?",
      [title, description, question_id]
    );

    res.status(200).json({ message: "Question updated successfully" });
  } catch (error) {
    console.error("Edit Question Error:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
}


// Delete Question and its Answers
async function deleteQuestion(req, res) {
  const { question_id } = req.params; // Fixed destructuring
  const { userId } = req.body; // User ID passed in the request body

  try {
      // Fetch the question's user ID
      const [questions] = await dbConnection.query("SELECT userid FROM questions WHERE questionid = ?", [question_id]);
      const question = questions[0]; // Retrieve the first result

      if (!question) {
          return res.status(404).json({ message: "Question not found" });
      }

      // Check authorization
      if (question.userid !== userId) {
          return res.status(403).json({ message: "You are not authorized to delete this question" });
      }

      // Delete associated answers and the question
      await dbConnection.query("DELETE FROM answers WHERE questionid = ?", [question_id]);
      await dbConnection.query("DELETE FROM questions WHERE questionid = ?", [question_id]);

      res.status(200).json({ message: "Question and its answers deleted successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while deleting the question" });
  }
}

// from CO

  
  

module.exports = { postQuestion, getAllQuestions, getQuestionAndAnswer, editQuestion, deleteQuestion,  };
