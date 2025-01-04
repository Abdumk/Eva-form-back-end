const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");
const crypto = require("crypto");

// Get Answers for a Question
async function getAnswer(req, res) {
  const questionid = req.params.question_id;
  try {
    const [rows] = await dbConnection.query(
      `SELECT 
            a.answerid, 
            a.userid AS answer_userid, 
            a.answer,
            u.username
         FROM 
            answers a inner join users u on a.userid = u.userid
         WHERE 
            a.questionid = ?`,
      [questionid]
    );
    return res.status(StatusCodes.OK).json({rows});
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "something went wrong, please try again later" });
  }
}

// Post Answers for a Question
async function postAnswer(req, res) {
  const { userid, answer, questionid } = req.body;
// Create a new date object
const currentTimestamp = new Date();

// Adjust the time by UTC+3 hours
const adjustedDate = new Date(currentTimestamp.getTime() + 3 * 60 * 60 * 1000);

// Format the date as 'YYYY-MM-DD HH:mm:ss'
const formattedTimestamp = adjustedDate
  .toISOString()
  .slice(0, 19)
  .replace("T", " ");

  if (!userid || !answer || !questionid) {
   return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }
  // const answerid = crypto.randomBytes(10).toString("hex");
  try {
    await dbConnection.query(
      "insert into answers (userid, answer, questionid,createdAt) values ( ?,?,?,?)",
      [ userid, answer, questionid,formattedTimestamp]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "answer posted successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "something went wrong, please try again later" });
  }
  //FROM CO
}

  // Edit Answer
  async function editAnswer(req, res) {
      const { answer_id } = req.params;
      const content = req.body.answer;
      const userId = req.body.userId; // Assuming user ID is available in req.user
  
      try {
          const [answers] = await dbConnection.query("SELECT userid FROM answers WHERE answerid = ?", [answer_id]);
          const answer = answers[0];

          console.log("answer is ---", answer);
          console.log("userid is ---", userId);
          console.log("answerid is ---", answer_id);


          if (answer.userid !== userId) {
              return res.status(403).json({ message: "You are not authorized to edit this answer" });
          }
  
          await dbConnection.query("UPDATE answers SET answer = ? WHERE answerid = ?", [content, answer_id]);
          res.status(200).json({ message: "Answer updated successfully" });
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
    }
  // Delete Answer
  async function deleteAnswer(req, res) {
      const { answer_id } = req.params;
      const userId = req.body.userId; // Assuming user ID is available in req.user
  
      try {
          const [answer] = await dbConnection.query("SELECT userid FROM answers WHERE answerid = ?", [answer_id]);
          if (answer.userid !== userId) {
              return res.status(403).json({ message: "You are not authorized to delete this answer" });
          }
  
          await dbConnection.query("DELETE FROM answers WHERE answerid = ?", [answer_id]);
          res.status(200).json({ message: "Answer deleted successfully" });
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  }
  
 


  // FROM CO


module.exports = {
  getAnswer,
  postAnswer,
 editAnswer,
 deleteAnswer
};
