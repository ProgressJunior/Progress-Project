require("dotenv").config();
const sql = require("mssql");
/*

        SQL

*/
const sqlConfig = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    server: process.env.SERVER,
    port: parseInt(process.env.PORT),
    options: {
      // encrypt: false, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
  };
  
  // Function that connects to Database
  // and then queries the passed parameter
  async function connect() {
    // connect
    try {
      // make sure that any items are correctly URL encoded in the connection string
      await sql.connect(sqlConfig);
    } catch (err) {
      // ... error checks
    }
  }

  async function queryDatabase(query){
    return sql.query(query);
  }

  module.exports = {sqlConfig, connect, queryDatabase};