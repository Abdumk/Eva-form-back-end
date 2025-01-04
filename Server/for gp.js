// Additional Considerations
// Authorization Checks: Ensure that only the owner can edit or delete their questions or answers. This can be handled in the backend controllers by comparing the user ID from the request with the owner ID of the question/answer.

// Visual Feedback: Show a loading spinner or a success/error message to the user during the edit/delete operations.

// Restore Functionality: Consider implementing a "soft delete" by adding a deleted field in your models and filtering out deleted items in your queries

// Adding Edit and Delete functionalities:

// Backend (Node.js):

// In controllers/questionController.js, implement functions for editing and deleting questions. These functions should take the question ID and potentially new data (title, description) as input. They should update or delete the question in the database and return a success/failure response.

// Similar logic needs to be implemented in controllers/answerController.js for editing and deleting answers.

// Frontend (React.js):

// In AskQuestion.jsx, add functionality to edit an existing question. You can achieve this by:

// Making the question form editable when the user clicks an "Edit" button.
// Pre-populate the form fields with the existing question data.
// Upon form submission, send a PUT request to the /api/question endpoint with the question ID and updated data.
// In questionCard.jsx, add buttons for editing and deleting a question. Clicking these buttons should:

// Trigger a confirmation dialog.
// Upon confirmation, send a DELETE request to the /api/question/:questionId endpoint (replace :questionId with the actual question ID).
// Refresh the question list to reflect the changes.
// Implement similar logic in the answer section of questionCard.jsx for editing and deleting answers using the /api/answer endpoint.

// Additional Considerations:

// Implement proper authorization checks to ensure that only the owner of a question or answer can edit or delete it.
// Provide visual feedback to the user about the success or failure of edit/delete operations.
// You might also want to consider implementing functionality to restore deleted questions or answers.
// Note: I cannot modify the actual code due to limitations, but I have provided a detailed explanation of the steps involved. You'll need to implement the logic in the mentioned files based on your specific database and framework.



// const express = require('express');
// require('dotenv').config();


//          // db connection
// const dbconnection = require('./db/dbConfig');




// const app = express();
// const cors = require("cors");
// const port = 3004


// // sample to test the server is working
// // app.get(`/`, (req, res)=> {
// // res.send("welcome")
// // })

// // user routes middleware file
// const useRoutes = require("./routes/userRoute");
// const questionRoute = require("./routes/questionRoute");
// const answerRoute = require("./routes/answerRoute")

// app.use(
//   cors(
//     (origins = [
//       "http://localhost:5173",
//     ])
//   )
// );

// // json middleware to extract json data
// app.use(express.json());
// // user routes middleware 
// app.use("/api/users", useRoutes);

// app.use("/api", questionRoute)
// app.use("/api", answerRoute)

// // questions routes middleware ??


// // answers routes middleware ??


// async function start() {
//     try {
//       const result = await dbconnection.execute("select 'test' ") 
//     // const [result] = await dbconnection.query("SELECT 'test' AS result");

//         console.log(result)
//        await app.listen(port)
//         console.log("database connection established")
//         console.log(`listing on ${port}`)
//      } catch (error) {
//          console.log(error.message);
         
//      }
     
// }
//  start() 



//  const express = require("express");
// const { getAnswer, postAnswer } = require("../controller/answerController");
// const router = express.Router();

// // Get Answers for a Question
// router.get("/answer/:question_id", getAnswer);

// // Post Answers for a Question
// router.post("/answer", postAnswer);

// module.exports = router;




// const express = require("express");
// const router = express.Router();

// const {postQuestion,getAllQuestions,getQuestionAndAnswer} = require("../controller/questionController")

// // get all questions
// router.get("/question", getAllQuestions);


// // get single question
// router.get("/question/:question_id", getQuestionAndAnswer);

// // post a question
// router.post("/question", postQuestion);

// module.exports = router;




// // these component used to organization to redius routing in app.js

// const express = require('express');
// const router = express.Router();

//   // user controllers
// const {register,login,checkUser} = require("../controller/userController");
// const authMiddleware = require('../middleware/authMiddleware');
     

//     // register route

//     router.post( "/register",register)
    
//     // login user
//     router.post( "/login",login)
        
//     // check user
//     router.get( "/check",authMiddleware,checkUser)

//  module.exports = router



//  const { StatusCodes } = require("http-status-codes");
//  const dbConnection = require("../db/dbConfig");
//  const crypto = require("crypto");
 
//  // Get Answers for a Question
//  async function getAnswer(req, res) {
//    const questionid = req.params.question_id;
//    try {
//      const [rows] = await dbConnection.query(
//        `SELECT 
//              a.answerid, 
//              a.userid AS answer_userid, 
//              a.answer,
//              u.username
//           FROM 
//              answers a inner join users u on a.userid = u.userid
//           WHERE 
//              a.questionid = ?`,
//        [questionid]
//      );
//      return res.status(StatusCodes.OK).json({rows});
//    } catch (err) {
//      console.log(err);
//      return res
//        .status(StatusCodes.INTERNAL_SERVER_ERROR)
//        .json({ message: "something went wrong, please try again later" });
//    }
//  }
 
//  // Post Answers for a Question
//  async function postAnswer(req, res) {
//    const { userid, answer, questionid } = req.body;
//  // Create a new date object
//  const currentTimestamp = new Date();
 
//  // Adjust the time by UTC+3 hours
//  const adjustedDate = new Date(currentTimestamp.getTime() + 3 * 60 * 60 * 1000);
 
//  // Format the date as 'YYYY-MM-DD HH:mm:ss'
//  const formattedTimestamp = adjustedDate
//    .toISOString()
//    .slice(0, 19)
//    .replace("T", " ");
 
//    if (!userid || !answer || !questionid) {
//     return res
//        .status(StatusCodes.BAD_REQUEST)
//        .json({ message: "All fields are required" });
//    }
//    // const answerid = crypto.randomBytes(10).toString("hex");
//    try {
//      await dbConnection.query(
//        "insert into answers (userid, answer, questionid,createdAt) values ( ?,?,?,?)",
//        [ userid, answer, questionid,formattedTimestamp]
//      );
//      return res
//        .status(StatusCodes.CREATED)
//        .json({ message: "answer posted successfully" });
//    } catch (err) {
//      console.log(err);
//      return res
//        .status(StatusCodes.INTERNAL_SERVER_ERROR)
//        .json({ message: "something went wrong, please try again later" });
//    }
//  }
 
//  module.exports = {
//    getAnswer,
//    postAnswer,
//  };
 



//  const { StatusCodes } = require("http-status-codes");
//  const dbConnection = require("../db/dbConfig");
//  const crypto = require("crypto");
 
//  // post questions / ask questions
//  async function postQuestion(req, res) {
//    const { userid, title, description, tag } = req.body;
//    // Create a new date object
//    const currentTimestamp = new Date();
 
//    // Adjust the time by UTC+3 hours
//    const adjustedDate = new Date(
//      currentTimestamp.getTime() + 3 * 60 * 60 * 1000
//    );
 
//    // Format the date as 'YYYY-MM-DD HH:mm:ss'
//    const formattedTimestamp = adjustedDate
//      .toISOString()
//      .slice(0, 19)
//      .replace("T", " ");
 
//    if (!userid || !title || !description) {
//      return res
//        .status(StatusCodes.BAD_REQUEST)
//        .json({ message: "All fields are required" });
//    }
//    const questionid = crypto.randomBytes(10).toString("hex");
//    try {
//      await dbConnection.query(
//        "insert into questions (questionid, userid, title, description, tag,createdAt) values ( ?, ?, ?, ?, ?,?)",
//        [questionid, userid, title, description, tag, formattedTimestamp]
//      );
//      return res
//        .status(StatusCodes.CREATED)
//        .json({ message: "question posted successfully" });
//    } catch (err) {
//      //    console.log(err);
//      return res
//        .status(500)
//        .json({ message: "something went wrong, please try again later" + err });
//    }
//  }
 
//  // get all questions
//  async function getAllQuestions(req, res) {
//    try {
//      const [questions] =
//        await dbConnection.query(`select q.questionid, q.title, q.description,q.createdAt, u.username from questions q   
//       inner join users u on q.userid = u.userid  order by q.createdAt desc`);
//      return res.status(StatusCodes.OK).json({
//        message: questions,
//      });
//    } catch (err) {
//      console.log(err);
//      return res
//        .status(StatusCodes.INTERNAL_SERVER_ERROR)
//        .json({ message: "something went wrong, please try again later" });
//    }
//  }
 
//  // get single question and answers
//  async function getQuestionAndAnswer(req, res) {
//    const questionid = req.params.question_id;
 
//    try {
//      const [rows] = await dbConnection.query(
//        `SELECT 
//            q.questionid, 
//            q.title, 
//            q.description, 
//            q.createdAt AS question_createdAt,
//            u2.username as question_username,
//            a.answerid, 
//            a.userid AS answer_userid, 
//            a.answer,
//            a.createdAt,
//            u.username as answer_username
//         FROM 
//            questions q   
//         LEFT JOIN 
//            answers a ON q.questionid = a.questionid
//            LEFT JOIN users u on u.userid = a.userid
//            left join users u2 on u2.userid = q.userid
//         WHERE 
//            q.questionid = ?
//            order by a.createdAt desc
//            `,
//        [questionid]
//      );
 
//      // Check if the question exists
//      if (rows.length === 0) {
//        return res
//          .status(StatusCodes.NOT_FOUND)
//          .json({ message: "Question not found" });
//      }
 
//      // Reshape the data to include answers under the question
//      const questionDetails = {
//        id: rows[0].questionid,
//        title: rows[0].title,
//        description: rows[0].description,
//        qtn_createdAt: rows[0].question_createdAt,
//        qtn_username: rows[0].question_username,
//        answers: rows
//          .map((answer) => ({
//            answerid: answer.answerid,
//            userid: answer.answer_userid,
//            username: answer.answer_username,
//            answer: answer.answer,
//            createdAt: answer.createdAt,
//          }))
//          .filter((answer) => answer.answerid !== null), // Filter out any null answers
//      };
 
//      res.status(StatusCodes.OK).json(questionDetails);
//    } catch (error) {
//      console.error(error);
//      res
//        .status(500)
//        .json({ message: "Error fetching question details" + error });
//    }
//  }
//  module.exports = { postQuestion, getAllQuestions, getQuestionAndAnswer };
 

//  // these component used to "for big project there is MVC...the arctict folder structure module(database),view(front end or cliant),controller" found in back-end and communicate with database
 
//           // db connection
//  const dbconnection = require('../db/dbConfig')
 
//  const  bcrypt = require('bcrypt')
//  const  {StatusCodes} = require('http-status-codes')
//  const jwt = require("jsonwebtoken");
 
 
 
//  async function register(req,res) {
//      // res.send("register")
//      const {username, firstname, lastname, email,password } = req.body
//      if (!username || !firstname || !lastname || !email || !password ){
//          return  res.status(StatusCodes.BAD_REQUEST).json({ 
//                           msg: "please provide all required information"})
//      }
//      try {
//          const [user] = await dbconnection.query ("SELECT username, userid FROM users WHERE username = ? or email = ?",[username,email])
//          // return  res.json({user: user})
//          if(user.length>0){
//              return  res.status(StatusCodes.CONFLICT).json({ 
//                                           msg: "user already register"})
//          }
//          if(password.length <= 8){
//              return  res.status(StatusCodes.BAD_REQUEST).json({ 
//                                      msg: "password must be at least 8 characters"})                        
//          }
 
//          //   encrypt thev password
//          const salt = await bcrypt.genSalt(10)
//         const hashedpassword = await bcrypt.hash(password,salt) 
//          await dbconnection.query("INSERT INTO users (username,firstname ,lastname,email, password)VALUES (?,?,?,?,?)" ,[username,firstname ,lastname,email,  hashedpassword] )
//          return  res.status(StatusCodes.CREATED).json({ 
//              msg: "User registered successfully"})
//      } catch (error) {
//          console.log(error.message);
//          return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//                                   msg: "An unexpected error occurred."})
//      }
//  }
 
//  async function login(req,res) {
//      // res.send("login")
//      const {email,password} = req.body;
//      // console.log(req.body);
 
//      if(!email || !password) {
//          return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide all required fields"});
//      }
//      try {
//           const [user] = await dbconnection.query ("SELECT username, userid , password FROM users WHERE email = ?",[email])
 
//          if (user.length == 0){
//              return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid username or password"})
//          }
//          // COMPARE password..., we use awaite b/c of isMatch return as apromise boolean value and also user is an array
//          const isMatch = await bcrypt.compare(password,user[0].password);
//          if(!isMatch){
//              return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid username or password"})
//          }
 
 
//             // Generate JWT token use to user hold in signin
//      const username = user[0].username;
//      const userid = user[0].userid;
//      const secret = process.env.JWT_SECRET;
//      // console.log(username, userid);
//      const token = jwt.sign({ username, userid }, secret, {
//        expiresIn: "1d", // Token expires in 1 day
//      });
 
//      // Return the token and success message
//      return res.status(StatusCodes.OK).json({
//        msg: "User logged in successfully",
//        token: token,
//      });
//      } catch (error) { 
//          console.log(error.message);  
//          return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//              msg: "An unexpected error occurred."})
//      }
//  }
 
//  function checkUser(req,res) {
//      // console.log("req=---", req , "res =====", res);
     
//      // res.send("check user")
//      const username = req.user.username;
//      const userid = req.user.userid;
//      return res.status(StatusCodes.OK).json({ username, userid });
//  }
 
//  module.exports = {register,login,checkUser}


 
// const { StatusCodes } = require("http-status-codes");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();

// async function authMiddleware(req, res, next) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res
//       .status(StatusCodes.UNAUTHORIZED)
//       .json({ msg: "Authentication invalid" });
//   }

//   try {
//     // If the token format is 'Bearer <token>', extract the token
//     const token = authHeader.split(" ")[1];
//     // console.log(token);
//     // console.log(authHeader);
// const secret = process.env.JWT_SECRET;
//     const { username, userid } = jwt.verify(token, secret);

//     // Attach user info to the request object
//     req.user = { username, userid };

//     // Call next middleware
//     next();
//   } catch (error) {
//     return res
//       .status(StatusCodes.UNAUTHORIZED)
//       .json({ msg: "Authentication invalid" });
//   }
// }

// module.exports = authMiddleware;



// // front end start here

// import styles from "./questionCard.module.css";
// import { MdAccountCircle } from "react-icons/md";
// import { FaChevronRight } from "react-icons/fa6";
// import { Link } from "react-router-dom";
// import moment from 'moment';
// import { LuCalendarClock } from "react-icons/lu";

// function QuestionCard({ id,userName, questionTitle,description,question_date }) {
//   const formattedDate = moment(question_date).format('ddd, MMM DD, YYYY h:mm A').toUpperCase();

//   return (
//     <Link to={`/question/${id}`} style={{textDecoration:"none" ,color:"black"}}>
//     <div className={styles.question_holder}>
//         <div className={styles.requester_question_holder}>
//             <div className={styles.requester_holder}>
//               <MdAccountCircle size={50} />
//               <div>{userName}</div>
//             </div>

//             <div className={styles.title_description_holder}>
//               <p className={styles.question_title}>{String(questionTitle).length>100? String(questionTitle).substring(0, 100).concat(". . .") : questionTitle}</p>
//               <p className={styles.question_description}>{String(description).length>300? String(description).substring(0, 300).concat(". . .") : description}</p>
//               <p className={styles.question_date}><LuCalendarClock style={{marginRight:"5px"}} />{formattedDate}</p>
//             </div>
//           </div>

//           <div className={styles.question_arrow_holder}>
//             <div>
//               <FaChevronRight size={23} />
//             </div>
//           </div>
//     </div>
//     </Link>
//   );
// }

// export default QuestionCard;


// import { useState } from "react";
// import {axiosInstance} from "../../utility/axios.js";
// import classes from "./login.module.css";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// function Login({ onSwitch }) {
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleTogglePassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axiosInstance.post(
//         "/users/login",
//         {
//           email: formData.email,
//           password: formData.password,
//         }
//       );
//       // console.log(response.data)
//       localStorage.setItem("EV-Forum-token-Jun2024", response.data.token); // Store the token in local storage Jun
//       window.location.href = "/"; // This will navigate to the / page and refresh the application
//       if (response.status === 200) {
//         setSuccess("Login successful! Redirecting..."); 
//         await Swal.fire({
//           title: "Success!",
//           text: "User Loggedin successfully!",
//           icon: "success",
//           confirmButtonText: "OK"
//         })
//         setError(null);
//       } else {
//         setError(response.data.msg || "Login failed.");
//         await Swal.fire({
//           title: "Error",
//           text: response.data.msg || "Error submitting the form. Please try again",
//           icon: "error",
//           confirmButtonText: "OK"
//         });
//         setSuccess(null);
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.msg || "Error logging in. Please try again."+err
//       );
//       await Swal.fire({
//         title: "Error",
//         text: err.response?.data?.msg || "Error submitting the form. Please try again",
//         icon: "error",
//         confirmButtonText: "OK"
//       });
//       setSuccess(null);
//     }
//   };

//   return (
//     <div className={classes.formcontainer}>
//       <div className={classes.innerContainer}>
//      <div className={classes.heading}>
//      <h2 className={classes.title}>Login to your account</h2>
//       <p className={classes.signuptext}>
//         Don't have an account?{" "}
//         <a
//           onClick={onSwitch}
//           style={{ cursor: "pointer", color: "var(--primary-color)" }}
//         >
//           Create a new account
//         </a>
//       </p>
//       {error && (
//         <p className={classes.error} style={{ marginBottom: "10px" }}>
//           {error}
//         </p>
//       )}{" "}
//       {/* Display error message */}
//       {success && <p className={classes.success}>{success}</p>}
//      </div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="email"
//           placeholder="User name or Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <div className={classes.passwordinput}>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <button type="button" onClick={handleTogglePassword} style={{}}>
//             {showPassword ? "🙉" : "🙈"}
//           </button>
//         </div>
//         <p className={classes.forgotpasswordtext}>
//           <Link to="/forgetPass">Forgot password?</Link>
//         </p>
//         <button type="submit" className={classes.submitbtn}>
//           Submit
//         </button>
          
//           <p style={{ cursor: "pointer",margin: "0 auto", color: "var(--primary-color)" }}>
       
        
//         <a
//           onClick={onSwitch}
//         >
//           Create an account?
//         </a>
//       </p>
//       </form>
//       </div>
//     </div>
//   );
// }

// export default Login;


// import  { useContext, useEffect, useState } from "react";
// import styles from "./home.module.css";
// import { BsArrowRightSquareFill } from "react-icons/bs";
// import Questions from "../Question/Questions.jsx";
// import Layout from "../../Layout/Layout.jsx";
// import { Link } from "react-router-dom";
// import { UserState } from "../../App.jsx";

// function Home() {
//   const { user } = useContext(UserState);
//   const userName = String(user?.username);
//   console.log(userName);
//   const greeting = 'Welcome'
  
 
//   return (
//     <Layout>
//       <div className={styles.home_container}>
//         <div className={styles.ask_welcome_holder}>
//           <div className={styles.ask_question}>
//             <Link to="/ask" style={{ textDecoration: "none" }}>
//               <button className={styles.ask_btn}>
//                 <span>Ask Question</span>
//                 <BsArrowRightSquareFill
//                   size={20}
//                   style={{ padding: "0 !important" }}
//                 />
//               </button>
//             </Link>
//           </div>
//           <div className={styles.welcome_msg}>
//             <p>
//               {greeting}   <span className={styles.userName}>{userName.charAt(0).toUpperCase() + userName.slice(1)}</span>
//             </p>
//           </div>
//         </div>

//         <div className={styles.questions_list}>
//           <Questions />
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default Home;


// import { useState } from "react";
// import styles from "./authLayout.module.css"; 
// import Login from "../Login/Login.jsx";
// import SignUp from "../SignUp/SignUp.jsx";
// import About from "../About/About.jsx";
// import Layout from "../../Layout/Layout.jsx";

// export default function AuthLayout() {
//   const [isLogin, setisLogin] = useState(true); // Renamed the setter to match the state
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   // Function to toggle between SignUp and Login forms
//   const toggleForm = () => {
//     setIsTransitioning(true); // Start the transition
//     setTimeout(() => {
//       setisLogin((prev) => !prev); // Change the component after fade-out
//       setIsTransitioning(false); // End the transition after fade-in
//     }, 500); // 500ms - CSS transition duration
//   };

//   return (
//     <Layout>
//       <div className={styles.container}>
//         <div className={styles.inner_container}>
//           <div
//             className={`${styles.formContainer} ${
//               isTransitioning ? styles.fadeOut : styles.fadeIn
//             }`}
//           >
//             {isLogin ? (
//               <Login onSwitch={toggleForm} />
//             ) : (
//               <SignUp onSwitch={toggleForm} />
//             )}
//           </div>
//           <div className={styles.about}>
//             <About />
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }


// import  { useContext, useRef } from "react";
// import classes from "./askQuestion.module.css";
// import { axiosInstance } from "../../../utility/axios";
// import { Link, useNavigate } from "react-router-dom";
// import Layout from "../../../Layout/Layout.jsx";
// import { UserState } from "../../../App.jsx";
// // this is imported for bootstrap sweet alert
// import Swal from "sweetalert2";

// function AskQuestion() {
//   const navigate = useNavigate();
//   const { user } = useContext(UserState);

//   // const navigate = useNavigate();
//   const titleDom = useRef();
//   const descriptionDom = useRef();
//   const userId = user?.userid;
//   console.log(user);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const title = titleDom.current.value;
//     const description = descriptionDom.current.value; 
//     const userid = userId;
//     const tag = "General";

//     try {
//       // Make a POST request to your server to create a new question
//       const response = await axiosInstance.post("/question", {
//         userid,
//         title,
//         description,
//         tag,
//       });
//       if (response.status === 201) {
//         console.log("Question created successfully");
//         await Swal.fire({
//           title: "Success!",
//           text: "Question created successfully!",
//           icon: "success",
//           confirmButtonText: "OK",
//         });
//         navigate("/");
//       } else {
//         console.error("Failed to create question");
//         await Swal.fire({
//           title: "Error",
//           text: "Failed to create question",
//           icon: "error",
//           confirmButtonText: "OK",
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       await Swal.fire({
//         title: "Error",
//         text: "Failed to create question. Please try again later.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   }

//   return (
//     <Layout>
//       <div className={classes.allContainer}>
//         <div className={classes.question__container}>
//           <div className={classes.question__wrapper}>
//             <h3 className={classes.question__header__title}>
//               <span className={classes.highlight}>
//                 Steps To Write A Good Question
//               </span>
//             </h3>

//             <div className={classes.questionContainer}>
//               <h2 className={classes.questionTitle}>
//                 How to Ask a Good Question
//               </h2>
//               <div className={classes.questionList}>
//                 <ul className={classes.questionListUl}>
//                   <li >
                  
//                     Summarize your problem in a one-line title.
//                   </li>
//                   <li >
                   
//                     Describe your problem in more detail.
//                   </li>
//                   <li >
                  
//                     Explain what you have tried and what you expected to happen.
//                   </li>
//                   <li >
                  
//                     Review your question and post it to the site.
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//           <h4 className={classes.highlight}>Ask a Public Question</h4>
//           <Link to="/">
//                   <h5 className={classes.highlight}>
//                     Go to Question page
//                   </h5>
//                 </Link>
//           <div className={classes.question__header__titleTwo}>
//             <form onSubmit={handleSubmit} className={classes.question__form}>
//               <input
//                 className={classes.question__title2}
//                 ref={titleDom}
//                 type="text"
//                 placeholder="Title"
//                 required
//               />
//               <textarea
//                 rows={4}
//                 className={classes.question__description}
//                 ref={descriptionDom}
//                 type="text"
//                 placeholder="Question Description..."
//                 required
//               />
//               <div className={classes.buttonContainer}>
//                 <button className={classes.question__button} type="submit">
//                   Post Question
//                 </button>
                
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default AskQuestion;


// import  { useEffect, useState, useContext } from "react";
// import styles from "./questions.module.css";
// import { axiosInstance } from "../../utility/axios.js";
// import QuestionCard from "../../components/QuestionCard/QuestionCard.jsx";
// import Loader from "../../components/Loader/Loader.jsx";
// import { UserState } from "../../App.jsx";

// function Question() {
//   const [questions, setQuestions] = useState([]); // Store all questions
//   const [loading, setLoading] = useState(false); // Loader state
//   const [searchQuery, setSearchQuery] = useState(""); // Search query state
//   const [currentPage, setCurrentPage] = useState(1); // Current page state
//   const questionsPerPage = 5; // Number of questions per page

//   const { user } = useContext(UserState);

//   // Fetch questions from API
//   useEffect(() => {
//     setLoading(true);
//     axiosInstance.get("/question").then((res) => {
//       setQuestions(res.data.message); // Set questions from API response
//       setLoading(false);
//     });
//   }, []);

//   // Filter questions based on search query
//   const filteredQuestions = questions.filter((question) => {
//     const titleMatches = question.title
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const descriptionMatches = question.description
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     return titleMatches || descriptionMatches;
//   });

//   // Pagination logic
//   const indexOfLastQuestion = currentPage * questionsPerPage; // Index of the last question
//   const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage; // Index of the first question
//   const currentQuestions = filteredQuestions.slice(
//     indexOfFirstQuestion,
//     indexOfLastQuestion
//   ); // Get the current page's questions

//   const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage); // Total pages calculation

//   // Handlers for "Previous" and "Next" buttons
//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1); // Go to previous page
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1); // Go to next page
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.search_question}>
//         <input
//           type="text"
//           placeholder="Search for a question"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)} // Update search query
//         />
//       </div>
//       <hr />
//       <h1 className={styles.title}>Questions</h1>

//       {/* Display loader when loading */}
//       {loading ? (
//         <Loader />
//       ) : filteredQuestions.length === 0 ? (
//         <div
//           style={{
//             display: "flex",
//             marginTop: "60px",
//             fontSize: "25px",
//             color: "var(--primary-color)",
//             marginBottom: "200px",
//             justifyContent: "center",
//           }}
//         >
//           <p>No Questions Found</p>
//         </div>
//       ) : (
//         <>
//           {/* Display questions for the current page */}
//           {currentQuestions.map((question) => (
//             <QuestionCard
//               key={question.questionid}
//               id={question.questionid}
//               userName={question.username}
//               questionTitle={question.title}
//               description={question.description}
//               question_date={question.createdAt}
//             />
//           ))}

//           {/* Pagination controls */}
//           <div className={styles.pagination}>
//             {/* Previous Button */}
//             <button
//               onClick={handlePrevious}
//               disabled={currentPage === 1} // Disable if on first page
//               style={{ marginRight: "10px", padding: "10px" }}
//             >
//               Previous
//             </button>

//             {/* Page information */}
//             <span>
//               Page {currentPage} of {totalPages}
//             </span>

//             {/* Next Button */}
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages} // Disable if on last page
//               style={{ marginLeft: "10px", padding: "10px" }}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Question;

// import  { useContext, useEffect, useRef, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { axiosInstance } from "../../utility/axios.js";
// import Layout from "../../Layout/Layout.jsx";
// import styles from "./answer.module.css";
// import { MdAccountCircle } from "react-icons/md";
// import moment from "moment";
// import { UserState } from "../../App.jsx";
// import { LuCalendarClock } from "react-icons/lu";
// import Swal from "sweetalert2";

// function QuestionAndAnswer() {
//   const [questionDetails, setQuestionDetails] = useState({});
//   const { user } = useContext(UserState);
//   const userId = user?.userid;
//   const { questionId } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [expandedAnswer, setExpandedAnswer] = useState(null); // State to track expanded answers
//   const answerInput = useRef();

//   // Fetch the question details
//   useEffect(() => {
//     axiosInstance.get(`/question/${questionId}`).then((res) => {
//       setQuestionDetails(res.data);
//       setLoading(false); // Set loading false after fetching
//     });
//   }, [questionId]);

//   // Post a new answer to the question
//   async function handlePostAnswer(e) {
//     e.preventDefault();
//     const response = await axiosInstance.post("/answer", {
//       userid: userId,
//       answer: answerInput.current.value,
//       questionid: questionId,
//     });
//     try {
//       if (response.status === 201) {
//         Swal.fire({
//           title: "Success!",
//           text: "Answer submitted successfully!",
//           icon: "success",
//           confirmButtonText: "OK",
//         }).then(() => {
//           window.location.reload();
//         });
//       } else {
//         Swal.fire({
//           title: "Error",
//           text: "Failed to post answer",
//           icon: "error",
//           confirmButtonText: "OK",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: "Failed to post answer. Please try again later.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   }

//   // Function to truncate text after 100 words
//   const truncateText = (text, limit = 50) => {
//     if (!text) return "";
//     const words = text.split(" ");
//     if (words.length > limit) {
//       return (
//         <>
//           {words.slice(0, limit).join(" ")}{" "}
//           <span
//             style={{
//               color: "var(--blue-shade)",
//               cursor: "pointer",
//             }}
//             onClick={() => toggleExpandAnswer(null)} // Function will handle the expansion/collapse
//           >
//             ... See More
//           </span>
//         </>
//       );
//     }
//     return text;
//   };

//   // Toggle expand/collapse for the answer
//   const toggleExpandAnswer = (answerId) => {
//     if (expandedAnswer === answerId) {
//       setExpandedAnswer(null); // Collapse the answer
//     } else {
//       setExpandedAnswer(answerId); // Expand the answer
//     }
//   };

//   return (
//     <Layout>
//       <div className={styles.container}>
//         <div className={styles.mainContainer}>
//           <div style={{ display: "flex" }}>
//             <div>
//               <h1 className={styles.questionTitle}>Question</h1>
//               <p className={styles.questionDescription}>
//                 {questionDetails?.description}
//               </p>
//               <p className={styles.question_date}>
//               Asked by: 
//                 <span style={{fontWeight: "600"}}> @{questionDetails?.qtn_username} </span> <br />
//                 <LuCalendarClock style={{ marginRight: "5px" }} size={19} />
//                 {moment(questionDetails.qtn_createdAt)
//                   .format("ddd, MMM DD, YYYY h:mm A")
//                   .toUpperCase()}
//               </p>
//             </div>
//           </div>
// <hr/>
//           <h2
//             style={{ padding: "5px 0", textAlign: "left", fontWeight: "600" }}
//           >

//             Answers From the Community:
//           </h2>
// <hr/>
//           {/* Display answers */}
//           {questionDetails?.answers?.length > 0 ? (
//             questionDetails?.answers?.map((answer) => (
//               <div key={answer?.answerid} className={styles.answer_holder}>
//                 <div className={styles.account_holder}>
//                   <MdAccountCircle size={50} />
//                   <div className={styles.profileName}>{answer?.username}</div>
//                 </div>
//                 <div
//                   className={styles.answerTextContainer}
//                   onClick={() => toggleExpandAnswer(answer?.answerid)} // Click on the whole container
//                 >
//                   <p className={styles.answerText}>
//                     {expandedAnswer === answer?.answerid
//                       ? answer?.answer
//                       : truncateText(answer?.answer)}
//                   </p>
//                   <p className={styles.answer_date}>
//                     <LuCalendarClock style={{ marginRight: "5px" }} size={19} />
//                     {moment(answer?.createdAt)
//                       .format("ddd, MMM DD, YYYY h:mm A")
//                       .toUpperCase()}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>
//               <span style={{ color: "red", fontWeight: "bold" }}>
//                 No answers yet!
//               </span>{" "}
//               <br /> Be the first to contribute your answer and help the
//               community.
//             </p>
//           )}

//           {/* Form to submit a new answer */}
//           <section className={styles.answerFormSection}>
//             <h3 className={styles.answerFormTitle}>Answer The Top Question</h3>
//             <Link to="/" className={styles.questionPageLink}>
//               Go to Question page
//             </Link>
//             <form onSubmit={handlePostAnswer}>
//               <textarea
//                 placeholder="Your Answer..."
//                 className={styles.answerInput}
//                 required
//                 ref={answerInput}
//               />
//               <button className={styles.postAnswerButton} type="submit">
//                 Post Your Answer
//               </button>
//             </form>
//           </section>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default QuestionAndAnswer;


// import  { useState } from "react";

// import classes from "./signUp.module.css";
// import { Link } from "react-router-dom";
// import { axiosInstance } from "../../utility/axios";
// import Swal from "sweetalert2";

// function Signup({ onSwitch }) {
//   const [error, setError] = useState(null); // for error message
//   const [success, setSuccess] = useState(null); // for success message
//   const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
//   const [formData, setFormData] = useState({
//     username: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleTogglePassword = () => {
//     setShowPassword((prev) => !prev); // Toggle the visibility state
//   };

//   // validate the form data for names
//   function validateUserData(fname, lname, username) {
//     // Check if first and last names contain only letters and are at least two characters long
//     const isValidFname = /^[A-Za-z]{2,}$/.test(fname.trim());
//     const isValidLname = /^[A-Za-z]{2,}$/.test(lname.trim());

//     // Check if username is more than two characters and holds only letters and numbers
//     const isValidUserName = /^[A-Za-z0-9]+$/.test(username.trim());
//     const isValidUsernameLength = username.trim().length > 1;

//     // Return true only if all conditions are met, after that we will send the request to our API
//     return (
//       isValidFname && isValidLname && isValidUserName && isValidUsernameLength
//     );
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Send a POST request to the server to register the user
//     if (
//       !validateUserData(
//         formData.firstName,
//         formData.lastName,
//         formData.username
//       )
//     ) {
//       return await Swal.fire({
//         title: "Error",
//         text: "Please enter a valid first, last and username.  Names should contain only letters and include at least two characters",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }

//     try {
//       const response = await axiosInstance.post("/users/register", {
//         // Sending user registration data
//         username: formData.username,
//         firstname: formData.firstName,
//         lastname: formData.lastName,
//         email: formData.email,
//         password: formData.password,
//       });
//       setSuccess("success");
    
//       if (response.status === 201) {
//         setError(null); // Clear any previous errors

//         // Show a success alert for registration
//         await Swal.fire({
//           title: "Success!",
//           text: "User registered successfully! Logging in...",
//           icon: "success",
//           confirmButtonText: "OK",
//         });

//         // Immediately log the user in after we do the registration
//         try {
//           const loginResponse = await axiosInstance.post("/users/login", {
//             email: formData.email, // we will make the user login with the registered email
//             password: formData.password, // The same password used for registration
//           });

//           // Check the response status after awaiting the promise
//           if (loginResponse.status === 200) {
//             // Store the JWT token (use localStorage, sessionStorage, or cookies as appropriate)
//             localStorage.setItem(
//               "EV-Forum-token-Jun-2024",
//               loginResponse.data.token
//             ); // Store the token in local storage

//             // Redirect to home page
//             window.location.href = "/";
//           } else {
//             setError(
//               loginResponse.data.msg || "Login failed. Please try again."
//             );
//           }
//         } catch (error) {
//           console.error("Login error:", error);
//           setError("An error occurred during login. Please try again.");
//         }
//       } else {
//         setError(response.data.Msg); 
//         await Swal.fire({
//           title: "Error",
//           text: error || "Error submitting the form. Please try again.",
//           icon: "error",
//           confirmButtonText: "OK",
//         });
//         setSuccess(null); // clear any previous success message
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.Msg ||
//           "Error submitting the form. Please try again." + err
//       );
//       await Swal.fire({
//         title: "Error",
//         text:
//           err.response?.data?.Msg ||
//           "Error submitting the form. Please try again.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//       setSuccess(null); // clear any previous success message
//     }
//   };

 
//   return (
//     <div className={classes.formcontainer}>
//       <h2>Join the network</h2>
//       <p className="signin-text">
//         Already have an account?{" "}
//         <a
//           onClick={onSwitch}
//           style={{ cursor: "pointer", color: "var(--primary-color)" }}
//         >
//           Sign in
//         </a>
//       </p>
//       {error && <p className={classes.error}>{error}</p>}{" "}
//       {success && <p className={classes.success}>{success}</p>}{" "}
//       <form method="POST" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />
//         <div className={classes.nameinputs}>
//           <input
//             type="text"
//             name="firstName"
//             placeholder="First name"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="lastName"
//             placeholder="Last name"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email address"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <div className={classes.passwordinput}>
//           <input
//             type={showPassword ? "text" : "password"} // Toggle between text and password
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <button
//             type="button"
//             onClick={handleTogglePassword}
//             className={classes.togglebtn}
//           >
//             {showPassword ? "🙉" : "🙈"}
//           </button>
        
//         </div>
//         <button type="submit" className={classes.submitbtn}>
//           Agree and Join
//         </button>
//         <div style={{ padding: "5px", fontSize: "14px" }}>
//             I agree to the <Link to="/privacyPolicy">privacy policy</Link> and{" "}
//             <Link to="/terms">terms of service</Link>.
//           </div>
//         <p className={classes.signintext}>
//           <a
//             onClick={onSwitch}
//             style={{ cursor: "pointer", color: "var(--primary-color)" }}
//           >
//             Already have an account?
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Signup;


// import { Routes, Route } from "react-router-dom";
// import Terms from "../components/Footer/Terms.jsx";
// import QuestionAndAnswer from "../Pages/QuestionAndAnswer/QuestionAndAnswer.jsx";
// import AskQuestion from "../Pages/Question/AskQuestion/AskQuestion.jsx";
// import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword.jsx";
// import PageNotFound from "../Pages/PageNotFound/PageNotFound.jsx";
// import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy.jsx";
// import Home from "../Pages/Home/Home.jsx";
// import AuthLayout from '../Pages/AuthLayout/AuthLayout.jsx'
// import HowItWorks from '../Pages/HowItWorks/HowItWorks.jsx'

// function AppRouter() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/ask" element={<AskQuestion />} />
//       <Route path="/question/:questionId" element={<QuestionAndAnswer />} />
//       <Route path="/howitworks" element={<HowItWorks />} />
//       <Route path="/terms" element={<Terms />} />
//       <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
//       <Route path="/auth" element={<AuthLayout />} />
//       <Route path="/forgetPass" element={<ForgotPassword />} />
//       <Route path="*" element={<PageNotFound />} />
//     </Routes>
//   );
// }

// export default AppRouter;




// import { createContext, useEffect, useState } from "react";
// import "./App.css";
// import { useNavigate } from "react-router-dom";

// import { axiosInstance } from "./utility/axios";
// import AppRouter from "./routes/AppRouter.jsx";

// export const UserState = createContext(); // Create a context for the user data

// function App() {
//   const [user, setUser] = useState({});
//   const navigate = useNavigate();

//   const getUserData = async () => {
//     try {
//       const token = localStorage.getItem("EV-Forum-token-Jun2024"); // Get the token stored during login from local storage
//       if (!token) {
//         navigate("/auth");
//       }

//       const userData = await axiosInstance
//         .get("/users/check", { headers: { Authorization: "Bearer " + token } })
//         .then((response) => response.data);
//       console.log(userData);
//       setUser(userData); // Store the user data in state so that it can be accessed by others too
//     } catch (error) {
//       console.log(error);
//       navigate("/auth");
//     }
//   };

//   useEffect(() => {
//     getUserData();
//   }, []);

//   return (
//     <UserState.Provider value={{ user, setUser }}>
//       <AppRouter />
//     </UserState.Provider>
//   );
// }

// export default App;


