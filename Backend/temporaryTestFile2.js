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

// async function query(query){
//   //await new Promise(r => setTimeout(r, 2000));
//   return await sql.query`${query}`
//   console.dir(result)
// }

async function query(question) {
    await connect();
    let res = await sql.query`${question}`;
    console.log(res);
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

console.log(query(""))

// path.forEach((e)=>{
//   e.startsWith("Q") ? console.log(genQuery(e, currentePaletteId, 2, date)) : console.log(genQuery(e, currentePaletteId, 1, date))

//   if(e.equals("TP 5")){
//     // query("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (RemovedFromPalUnit)")
//     console.log("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (RemovedFromPalUnit)")
//   }
//   else if(e.equals("TP 6")){
//     if(query("select PalNo from dbo.PalDataBelHistory where PalNo = " + currentePaletteId) == ""){
//       queryDatabase("insert into dbo.PalData (ProdSeqId) values ("+currentePaletteId+")")
//       queryDatabase("insert into dbo.PalDataBelHistory (PalNo, TimeStamp) values ("+currentePaletteId+","+time+")")
//       queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (ShutteringFinished)")
//     }
//   }
//   else if(e.equals("TP 12")){
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
//   // Finished Variable bei Path einfuegen
//   else if(e.equals("Vaffanculo")){
//     queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (RemovedFromDryingChamber)")
//   }
// })
