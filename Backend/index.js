const { json } = require("express");
const express = require("express");
const app = express();
require("dotenv").config();
const sql = require("mssql");


let queries = [];
let minute = 0;
let dt = new Date();

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

async function main() {
  await connect();
  //let res = await sql.query`SELECT * FROM LocPalHistory`;
  //console.log(res);


  for(i=0;i<path.length;i++){
    e = path[i];
    //console.log(dt)
    if(e.startsWith("Q")) await genQuery(e, 2, 2, dt)
    else await genQuery(e, 2, 1, dt)
  }
  // path.forEach((e)=>{
  //   if(e.startsWith("Q")) await genQuery(e, 2, 2, date)
  //   else await genQuery(e, 2, 1, date)
  // });

  console.log(queries);

}

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

function genDate(year, month, day, hours, minutes){

  if (minutes.toString().length == 1){
    minutes = "0" + minutes.toString();
  }
  return `${year}-${month}-${day} ${hours}:${minutes}:00.000`;
}

async function genQuery(taktplatz, palette, duration, date) {

  //console.log(parseInt(minute/60))
  let deit = genDate(dt.getFullYear(),dt.getMonth() + 1, dt.getDate(), 10, minute);

  queries.push(`INSERT INTO LocPalHistory (LocationName, PalNo, TimeStamp) VALUES ('${taktplatz}', ${palette}, ${deit});`);

  if(duration == 2){
    // es ist ein Kran
    let kranId = await sql.query(`SELECT Id FROM SampleValueHistoryValue_Ids WHERE Value_ID LIKE '${taktplatz.replace(/\s/g, "")}_Pos'`);
    kranId = kranId.recordset[0].Id;
    
    let indexOfTaktplatz = parseInt(path.indexOf(taktplatz));
    let temp = path[indexOfTaktplatz-1]
    if(temp == "TP 17" && taktplatz == "QV 5") temp = "TP 17.1"
    else if (temp == "TP 17" && taktplatz == "QV 6") temp = "TP 17.2"
    let index = qv_index[temp]
    deit = genDate(dt.getFullYear(),dt.getMonth() + 1, dt.getDate(), 10, minute);
    queries.push(`INSERT INTO SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) VALUES ('${kranId}', ${index}, ${deit};`);
    minute+=duration;

    temp = path[indexOfTaktplatz+1]
    if(temp == "TP 17" && taktplatz == "QV 5") temp = "TP 17.1"
    else if (temp == "TP 17" && taktplatz == "QV 6") temp = "TP 17.2"
    index = qv_index[temp]
    deit = genDate(dt.getFullYear(),dt.getMonth() + 1, dt.getDate(), 10, minute);
    queries.push(`INSERT INTO SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) VALUES ('${kranId}', ${index}, ${deit};`);
    minute+=1;
    deit = genDate(dt.getFullYear(),dt.getMonth() + 1, dt.getDate(), 10, minute);
    queries.push(`INSERT INTO SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) VALUES ('${kranId}', 0, ${deit};`);
    minute-=3;
  }

  minute += duration;
  deit = genDate(dt.getFullYear(),dt.getMonth() + 1, dt.getDate(), 10, minute);
  queries.push(`INSERT INTO LocPalHistory (LocationName, PalNo, TimeStamp) VALUES ('${taktplatz}', 0, ${deit});`);
  
}

let path = [
  "TP 1",
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
  "TP 17",
  "QV 6",
  "TP 18",
  "TP 23",
  "TP 25",
];

// Pseudocode to write Data to palette
let currentePaletteId = 2;
// path.forEach((e)=>{
//   e.startsWith("Q") ? console.log(genQuery(e, currentePaletteId, 2, date)) : console.log(genQuery(e, currentePaletteId, 1, date))

//   if(e.equals("TP 5")){
//     queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (RemovedFromPalUnit)")
//   }
//   else if(e.equals("TP 6")){
//     if(queryDatabase("select PalNo from dbo.PalDataBelHistory where PalNo = " + currentePaletteId) is empty){
//       queryDatabase("insert into dbo.PalData (ProdSeqId) values ("+currentePaletteId+")")
//       queryDatabase("insert into dbo.PalDataBelHistory (PalNo, TimeStamp) values ("+currentePaletteId+","+time+")")
//       queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (ShutteringFinished)")
//     }
//   }else if(e.equals("TP 12")){
//     queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (BarsPlaced)")
//   }
//   else if(e.equals("TP 13")){
//     queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (GirdersPlaced)")
//   }
//   else if(e.equals("TP 23")){
//     queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (ConcretingFinished)")
//   }
//   // LG bei Path einfuegen
//   // Lagerplatz bestimmen
//   else if(e.equals("LG 1")){
//     queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (EnteredInDryingChamber)")
//   }
// })

var qv_index = {
  "TP 2": 1,
  "TP 3": 2,
  "TP 4": 2,
  "TP 5": 3,
  "TP 6": 1,
  "TP 7": 2,
  "TP 8": 3,
  "TP 9": 2,
  "TP 10": 1,
  "TP 11": 1,
  "TP 12": 2,
  "TP 14": 1,
  "TP 14.1": 2,
  "TP 15": 1,
  "TP 16": 2,
  "TP 16.1": 3,
  "TP 17.1": 4,
  "TP 17.2": 1,
  "TP 18": 2,
  "TP 19": 3,
  "TP 20": 4,
};

main();
//   // Finished Variable bei Path einfuegen
//   else if(e.equals("Vaffanculo")){
//     queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (RemovedFromDryingChamber)")
//   }
// })


