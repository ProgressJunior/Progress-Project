const sql = require("mssql");
require("dotenv").config();

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
async function query(query) {
  //await new Promise(r => setTimeout(r, 2000));
  return await sql.query`${query}`;
  console.dir(result);
}

//move RBG Portal
async function moveRBG(x, y, start, end) {
  await connect();

  //select id of RBG Portal
  let portal_id =
    await sql.query`SELECT Id FROM dbo.SampleValueHistoryValue_Ids WHERE Value_Id LIKE '.RBG_SCHNITTSTELLE.ACHSE_PORTAL.ISTPOS';`;

  //select id of RGB Hub
  let hub_id =
    await sql.query`SELECT Id FROM dbo.SampleValueHistoryValue_Ids WHERE Value_Id LIKE '.RBG_SCHNITTSTELLE.ACHSE_HUBWERK.ISTPOS';`;

  //select query for RBG Portal
  let istposx =
    await sql.query`SELECT Value FROM SampleValueHistoryT WHERE TIMESTAMP = (SELECT MAX(TIMESTAMP) FROM SampleValueHistoryT GROUP BY Value_Id_Ref HAVING Value_Id_Ref =${portal_id.recordset[0].Id});`;
  console.log(istposx);

  //select query for RBG Hub
  let istposy =
    await sql.query`SELECT Value FROM SampleValueHistoryT WHERE TIMESTAMP = (SELECT MAX(TIMESTAMP) FROM SampleValueHistoryT GROUP BY Value_Id_Ref HAVING Value_Id_Ref =${hub_id.recordset[0].Id});`;
  console.log(istposy);

  await sql.query`insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values ('2','${x}','${time}');`;
  await sql.query`insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values ('8','${x}','${time}');`;

  moveRBG(istposx, x, TimeStamp, 2);
  moveRBG(istposy, y, TimeStamp, 8);

  sql.close();
}

moveRBG(0, 0);

// module.exports = {
//   //
// };
