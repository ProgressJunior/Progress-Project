const { json } = require("express");
const express = require("express");
const app = express();
require("dotenv").config();
const sql = require("mssql");
var moment = require('moment');  

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
        trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
};

async function connect() {
    try {
        await sql.connect(sqlConfig);
    } catch (err) {
      console.error(err)
    }
}

async function query(question) {
  let res = await sql.query(`${question}`);
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
// let date = new Date().toISOString().substring(0, 10) + " 10:";

function genQuery(taktplatz, palette, duration, date) {

  let anfangsDay = date.toISOString().substring(0, 10)
  let anfangsUhrzeit = date.toISOString().substring(11,19)

  let endDate = moment(date).add(duration, 'm').toDate();
  let endDay = endDate.toISOString().substring(0, 10)
  let endUhrzeit = endDate.toISOString().substring(11,19)


  console.log(`${anfangsDay}  ${anfangsUhrzeit} bis ${endDay} ${endUhrzeit}`)

  // console.log(date.toISOString().substring(0, 10))

  // let locDate = date.toISOString().substring(0, 10) + "   " + date.toISOString().substring(11,19)

  // let query1 = `Palette ${palette} ist um ${locDate} auf ${taktplatz}`;

  // minStr = (minute + duration).toString();
  // if (minStr.length == 1) minStr = "0" + minStr;

  // locDate = date.toISOString().substring(0, 10) + minStr;

  // let query2 = `Palette ${palette} weg um ${locDate} von ${taktplatz}`;

  // minute += duration;
  // return query1 + "\n" + query2 + "\n\n";
}

async function main(){
  await connect();
  
  for(let i = 0; i < path.length; i++){
    let nextMaxTs = await sql.query`select Max(Timestamp) from dbo.LocPalHistory where LocationName like ${path[i+1]} and PalNo = 2`
    
    // console.log(path[i+1])
    // console.dir(nextMaxTs.recordset[0][""])
    // console.log("frei \n")
    path[i].startsWith("Q") ? console.log(genQuery(path[i], 2, 2, nextMaxTs.recordset[0][""])) : console.log(genQuery(path[i], 2, 1, nextMaxTs.recordset[0][""]))

    // extraSteps(e)
  }
}

async function extraSteps(e){
  switch(e){
    case "TP 5":
      query("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (RemovedFromPalUnit)")
    
    case "TP 6":
  
      // Needed to check if the given palette is already in the list
      let isIncluded = false;
      let res = await query("select PalNo from dbo.PalDataBelHistory")
      res.recordset.forEach((e)=> {
        if(e.PalNo==currentePaletteId) isIncluded = true;
      });
  
      // Time muss noch geadded werden
      if(isIncluded){
        queryDatabase("insert into dbo.PalData (ProdSeqId) values ("+currentePaletteId+")")
        queryDatabase("insert into dbo.PalDataBelHistory (PalNo, TimeStamp) values ("+currentePaletteId+","+time+")")
        queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (ShutteringFinished)")
      }
    
    case "TP 12":
      queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (BarsPlaced)")
    
    case "TP 13":
      queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (GirdersPlaced)")
    
    case"TP 23":
      queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (ConcretingFinished)")
    // LG bei Path einfuegen
    // Lagerplatz bestimmen
    case"LG 1":
      queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (EnteredInDryingChamber)")
    // Finished Variable bei Path einfuegen
    case"Finished":
      queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (RemovedFromDryingChamber)")
    }
}

main()