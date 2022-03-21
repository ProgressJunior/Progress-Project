const sql = require("mssql");
const sqlConfig = {
  user: "userTeam1",
  password: "KennwortTeam1",
  database: "ebos_Progress_Team1",
  server: "10.10.30.219",
  port: 50915,
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};
sql.connect(sqlConfig, (err) => {
  if (err) {
    throw err;
  }
  console.log("Connection Successful !");

  new sql.Request().query("select * from dbo.LocPalHistory", (err, result) => {
    //handle err
    console.dir(result);
    // This example uses callbacks strategy for getting results.
  });
});

sql.on("error", (err) => {
  // ... error handler
  console.log("Sql database connection error ", err);
});
