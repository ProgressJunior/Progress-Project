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



console.log(minStr)

function genQuery(taktplatz,palette,duration,date){

  let minute = 0;

  let minStr = minute.toString();
  if (minStr.length == 1) minStr = ("0" + minStr)
  let locDate = date + minStr + ":00.000";
  let query1 = `INSERT INTO LocPalHistory (LocationName, PalNo, TimeStamp) VALUES ('${taktplatz}', ${palette}, ${locDate});`;
  minStr = (minute + duration).toString();
  if (minStr.length == 1) minStr = ("0" + minStr)
  locDate = date + minStr + ":00.000";
  let query2 = `INSERT INTO LocPalHistory (LocationName, PalNo, TimeStamp) VALUES ('${taktplatz}', 0, ${locDate});`;
  minute+=duration;
  return query1 + query2;
}

let path = ["TP 1",
            "TP 2",
            "QV 2",
            "TP 3",
            "TP 4",
            "QV 1",
            "TP 5",
            "TP 6",
            "QV 3",
            "TP 10",
            "QV 8",
            "TP 9",
            "TP 11",
            "QV 4",
            "TP 12",
            "TP 13",
            "TP 14",
            "QV 7",
            "TP 14.1",
            "TP 15",
            "QV 5",
            "TP 18",
            "TP 23",
            "TP 25",
            ]

// path.forEach((e)=>{
//   e.startsWith("Q") ? console.log(genQuery(e, 2, 5)) : console.log(genQuery(e, 2, 1))
// })
// let date = new Date().toISOString().substring(0,10) + " 10:";
