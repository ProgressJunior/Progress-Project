let db = require("./db");
require("dotenv").config();

//move RBG Portal
async function moveRBG(x, y, time) {
  await db.connect();

  //select id of RBG Portal
  // let portal_id =
  //   await db.queryDatabase("SELECT Id FROM dbo.SampleValueHistoryValue_Ids WHERE Value_Id LIKE '.RBG_SCHNITTSTELLE.ACHSE_PORTAL.ISTPOS'");

  // //select id of RGB Hub
  // let hub_id =
  //   await db.queryDatabase("SELECT Id FROM dbo.SampleValueHistoryValue_Ids WHERE Value_Id LIKE '.RBG_SCHNITTSTELLE.ACHSE_HUBWERK.ISTPOS'");
  //   console.log("test1");
  //   //select query for RBG Portal
  // let istposx =
  //   await db.queryDatabase("SELECT Value FROM SampleValueHistoryT WHERE TIMESTAMP = (SELECT MAX(TIMESTAMP) FROM SampleValueHistoryT GROUP BY Value_Id_Ref HAVING Value_Id_Ref ="+portal_id.recordset[0].Id+"");
  //   console.log("test2");

  // //select query for RBG Hub
  // let istposy =
  //   await db.queryDatabase("SELECT Value FROM SampleValueHistoryT WHERE TIMESTAMP = (SELECT MAX(TIMESTAMP) FROM SampleValueHistoryT GROUP BY Value_Id_Ref HAVING Value_Id_Ref ="+hub_id.recordset[0].Id+"");

  //y-Richtung
  await db.queryDatabase(
    "insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (8," +
      y +
      ",'" +
      time +
      "')"
  );

  //query insert x value
  await db.queryDatabase(
    "insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (2," +
      x +
      ",'" +
      time +
      "')"
  );

  // await db.queryDatabase("insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (8,"+y+","+time+")");
  //x-Richtung
  // await db.queryDatabase("insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (2,"+x+","+time+")");
  // await sql.query`insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (${portal_id.recordset[0].Id},${x},${time})`;
  // await sql.query`insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (${hub_id.recordset[0].Id},${y},${time})`;
  // await sql.query`insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values ('${hub_id}','${y}','${time}')`;
}

moveRBG(4400, -105.5, "2022-03-24 17:24:00.000");
moveRBG(2350.1, 490.4125, "2022-03-24 17:30:00.000");

console.log(items["TP 24"]);

// module.exports = {
//   //
// };
