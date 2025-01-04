const mysql2 = require('mysql2');
require('dotenv').config(); // Ensure dotenv is configured

// Create a connection pool
const dbconnection = mysql2.createPool({
    user: process.env.USER,
    database: process.env.DATA_BASE,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    connectionLimit: 10,
});

// Initialize the database tables
async function initializeDatabase() {
    try {
        const db = dbconnection.promise();

        // Users table
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                userid INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                firstname VARCHAR(255),
                lastname VARCHAR(255),
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `);

        // Questions table
        await db.query(`
            CREATE TABLE IF NOT EXISTS questions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                userid INT,
                questionid VARCHAR(255) UNIQUE NOT NULL,
                title VARCHAR(255),
                description VARCHAR(255),
                tag VARCHAR(255),
                FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Answers table
        await db.query(`
            CREATE TABLE IF NOT EXISTS answers (
                answerid INT AUTO_INCREMENT PRIMARY KEY,
                userid INT,
                questionid VARCHAR(255),
                answer VARCHAR(255),
                FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE,
                FOREIGN KEY (questionid) REFERENCES questions(questionid) ON DELETE CASCADE,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Database initialized successfully.');
    } catch (error) {
        console.error('Error initializing database:', error.message);
    }
}

// Call the initialization function
initializeDatabase();

// Export the connection pool
module.exports = dbconnection.promise();




























// const mysql2 = require('mysql2');

// const dbconnection = mysql2.createPool({
// user:process.env.USER,  
// database:process.env.DATA_BASE,
// host:"localhost",
// password:process.env.PASSWORD,
//     connectionLimit: 10
// })

// // check the connection b/n dotenv & dbConfig first require dotenv with config @ app.js
// console.log(process.env.JWT_SECRET);


// // when we insert data for  register,answer,question....will happen call backheal so we should turn to PROMISE based
// // dbconnection.execute( "select 'test' ", (err,result)=> {

// //     if(err) {
// //         console.log(err.message);
// //     }else{
// //         console.log(result);

// //     }
// // })


// module.exports = dbconnection.promise(); 












