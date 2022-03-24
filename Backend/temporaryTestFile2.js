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

async function query(question) {
    await connect();
    // let res = await sql.query`select * from dbo.PalDataBelHistory`;
    let res = await sql.query(`${question}`);
    // console.log(res);
    return res;
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
    "TP 7",
    "TP 10",
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
    "LG 1",
    "Finished"
];

// Pseudocode to write Data to palette
let currentePaletteId = 5;
let minute = 0;
let date = new Date().toISOString().substring(0, 10) + " 10:";

function genQuery(taktplatz, palette, duration, date) {
  let minStr = minute.toString();
  if (minStr.length == 1) minStr = "0" + minStr;
  let locDate = date + minStr + ":00.000";
  let query1 = `Palette ${palette} ist um ${locDate} auf ${taktplatz}`;
  minStr = (minute + duration).toString();
  if (minStr.length == 1) minStr = "0" + minStr;
  locDate = date + minStr + ":00.000";
  let query2 = `Palette ${palette} weg um ${locDate} von ${taktplatz}`;
  minute += duration;
  return query1 + "\n" + query2 + "\n\n";
}

path.forEach(async (e)=>{
  e.startsWith("Q") ? console.log(genQuery(e, currentePaletteId, 2, date)) : console.log(genQuery(e, currentePaletteId, 1, date))

  if(e == "TP 5"){
    // query("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (RemovedFromPalUnit)")
    console.log("TP 5")
    console.log("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (RemovedFromPalUnit)")
  }
  else if(e == "TP 6"){

    // Needed to check if the given palette is already in the list
    let isIncluded = false;
    let res = await query("select PalNo from dbo.PalDataBelHistory")
    res.recordset.forEach((e)=> {
      if(e.PalNo==currentePaletteId) isIncluded = true;
    });

    // Time muss noch geadded werden
    if(isIncluded){
      // queryDatabase("insert into dbo.PalData (ProdSeqId) values ("+currentePaletteId+")")
      // queryDatabase("insert into dbo.PalDataBelHistory (PalNo, TimeStamp) values ("+currentePaletteId+","+time+")")
      // queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (ShutteringFinished)")
      console.log("Wenn schon drinn")
      console.log("insert into dbo.PalData (ProdSeqId) values ("+currentePaletteId+")")
      console.log("insert into dbo.PalDataBelHistory (PalNo, TimeStamp) values ("+currentePaletteId+",)")
      console.log("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (ShutteringFinished)")
    }
  }
  else if(e == "TP 12"){
    // queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (BarsPlaced)")
    console.log("TP 12")
    console.log("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (BarsPlaced)")
  }
  else if(e == "TP 13"){
    // queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (GirdersPlaced)")
    console.log("TP 13")
    console.log("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (GirdersPlaced)")
  }
  else if(e == "TP 23"){
    // queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (ConcretingFinished)")
    console.log("TP 23")
    console.log("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (ConcretingFinished)")
  }
  // LG bei Path einfuegen
  // Lagerplatz bestimmen
  else if(e == "LG 1"){
    // queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (EnteredInDryingChamber)")
    console.log("LG 1")
    console.log("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (EnteredInDryingChamber)")
  }
  // Finished Variable bei Path einfuegen
  else if(e == "Finished"){
    // queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (RemovedFromDryingChamber)")
    console.log("Finished")
    console.log("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (RemovedFromDryingChamber)")
  }
})
