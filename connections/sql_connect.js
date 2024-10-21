const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const sqlconnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password : process.env.PASSWORD,
  database: "resturant",
  multipleStatements: true,
});

sqlconnection.connect((err) => {
  if (!err) {

    console.log("Data base has been connected to the hotel server");
  } else {
    console.log("Unable to connect the database to the hotel server",err);
  }
});

module.exports = sqlconnection;
