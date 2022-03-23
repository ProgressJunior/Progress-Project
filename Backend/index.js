const { json } = require("express");
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
      if (err) {
        console.log(err);
        throw err;
      }
      arr = result.recordset.map((row) => {
        return row.LocationName;
      });
      console.log(arr);
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

const date = "2022-03-22 10:";
let minute = 0;

function genQuery(taktplatz, palette, duration) {
  let minStr = minute.toString();
  if (minStr.length == 1) minStr = ("0" + minStr).slice(-2);
  let locDate = date + minStr + ":00.000";
  let query1 = `INSERT INTO LocPalHistory (LocationName, PalNo, TimeStamp) VALUES ('${taktplatz}', ${palette}, ${locDate});`;
  minStr = (minute + duration).toString();
  if (minStr.length == 1) minStr = ("0" + minStr).slice(-2);
  locDate = date + minStr + ":00.000";
  let query2 = `INSERT INTO LocPalHistory (LocationName, PalNo, TimeStamp) VALUES ('${taktplatz}', 0, ${locDate});`;
  minute += duration;
  return query1 + query2;
}
