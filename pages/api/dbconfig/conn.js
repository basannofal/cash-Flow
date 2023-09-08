import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  // port: 'YOUR_MYSQL_PORT', // Typically 3306
  user: "root",
  password: "",
  database: "cash_flow",
});
const conn = pool.promise();

export default conn;
