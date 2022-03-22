const express = require("express");
const app = express();
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

// Function that connects to and Database
// and then queries the passed parameter
function queryDatabase(query) {
  // Establishes connection to database
  sql.connect(sqlConfig, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }

    // Queries passed param to database
    new sql.Request().query(query, (err, result) => {
      console.dir(result);
    });
  });
}

// Error handler
sql.on("error", (err) => {
  console.log("Sql database connection error ", err);
});

/*

        EXPRESS

*/
const express_port = process.env.EXPRESS_PORT;

app.listen(express_port, () => {
  console.log(`Example app listening on port ${express_port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/updateTable/:arg", (req, res) => {
  // res.send(req.params.arg)
  queryDatabase(req.params.arg);
  res.end();
});
