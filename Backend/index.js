const express = require("express");
const app = express();
const port = 3030;
require("dotenv").config();
const sql = require("mssql");

const sqlConfig = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  server: process.env.SERVER,
  port: process.env.PORT,
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/updateTable/:arg', (req, res) => {
  queryDatabase(req.params.arg)
})

function queryDatabase(query){
  sql.connect(sqlConfig, (err) => {
    if (err) {
      throw err;
    }
    console.log("Connection Successful !");
    //"select * from dbo.LocPalHistory"
    new sql.Request().query(query, (err, result) => {
      console.dir(result);
    });
  });
  res.end();
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// sql.connect(sqlConfig, (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("Connection Successful !");

//   new sql.Request().query("select * from dbo.LocPalHistory", (err, result) => {
//     //handle err
//     console.dir(result);
//     // This example uses callbacks strategy for getting results.
//   });
// });

// sql.on("error", (err) => {
//   // ... error handler
//   console.log("Sql database connection error ", err);
// });
