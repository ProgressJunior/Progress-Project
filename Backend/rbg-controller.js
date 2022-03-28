let db = require('./db');
require("dotenv").config();


//move RBG Portal
async function moveRBG(x, y,time) {
  await db.connect()

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
  await db.queryDatabase("insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (8,"+y+",'"+time+"')");

  //query insert x value
  await db.queryDatabase("insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (2,"+x+",'"+time+"')");

  // await db.queryDatabase("insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (8,"+y+","+time+")");
  //x-Richtung
  // await db.queryDatabase("insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (2,"+x+","+time+")");
  // await sql.query`insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (${portal_id.recordset[0].Id},${x},${time})`;
  // await sql.query`insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (${hub_id.recordset[0].Id},${y},${time})`;
  // await sql.query`insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values ('${hub_id}','${y}','${time}')`;
}

moveRBG(4400,-105.5,'2022-03-24 17:24:00.000');
moveRBG(2350.1,490.4125,'2022-03-24 17:30:00.000');



var items = [
  ["TP 24", 0.1],
  ["TP 25", 4400.1],
  ["TP 26", 8800.1],
  ["TP 27", 12130.1],
  ["R 1", 2350.1],
  ["R 2", 5660.1],
  ["R 3", 8800.1],
  ["R 4", 13130.1],
  ["R 5", 15380.1],
  ["E 0", -105.5],
  ["E 1", 490.4125],
  ["E 2", 1086.325],
  ["E 3", 1682.2375],
  ["E 4", 2278.15],
  ["E 5", 2874.0625],
  ["E 6", 3469.975],
  ["E 7", 4065.8875],
  ["E 8", 4661.8],
  ["E 9", 5257.7125],
  ["E 10", 5853.625],
  ["E 11", 6449.5375],
  ["E 12", 7045.45],
  ["E 13", 7641.3625],
  ["E 14", 8237.275],
  ["E 15", 8833.1875],
  ["E 16", 9429.1]
];


// module.exports = {
//   //
// };
