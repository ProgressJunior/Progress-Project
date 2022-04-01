const { json } = require("express");
const values = require("./values.json");
const express = require("express");

const cors = require("cors");
const app = express();
app.use(cors());
// Cors

require("dotenv").config();
const sql = require("mssql");
var moment = require("moment");
const db = require("./db");

let queries = [];
let minute = 0;
let dt = new Date();

async function writeToDB() {
  await db.connect();

  let startDate = moment(new Date());
  let endDate = moment(new Date());
  let duration = 0;

  for (let i = 0; i < path.length; i++) {
    startDate = endDate;
    // check if first station is free and wait if its not
    if (i == 0) {
      let freeStartTime = await nextFreeTime(path[i]);

      if (freeStartTime.recordset.length > 0) {
        startDate = moment(freeStartTime.recordset[0].TimeStamp).subtract(
          2,
          "hours"
        );
        startDate = moment(startDate).add(1, "minutes");
      }
    }

    path[i].startsWith("Q") ? (duration = 2) : (duration = 1);
    endDate = moment(startDate).add(duration, "minutes");

    // 1 hour needs to be subtract because casting to moment adds 1 hour
    let nextFreeTs;
    if (i != path.length) {
      nextFreeTs = await nextFreeTime(path[i + 1]);
    }
    //check if attribute of json is empty
    if (nextFreeTs.recordset.length > 0) {
      nextFreeTs = moment(nextFreeTs.recordset[0].TimeStamp).subtract(
        2,
        "hours"
      );
      nextFreeTs = moment(nextFreeTs).add(1, "minutes");
      console.log(
        "NextFreeTs: " + nextFreeTs.format("YYYY-MM-DD HH:mm:ss.SSS")
      );

      if (moment(endDate).isBefore(nextFreeTs)) {
        console.log("Palette has to wait");
        endDate = nextFreeTs;
      }
    }

    // console.log("Starttime: " + startDate.format("YYYY-MM-DD HH:mm:ss.SSS"))
    // console.log(path[i+1] + " free at ");
    // console.log(nextFreeTs);
    // console.log("Endtime:   " + endDate.format("YYYY-MM-DD HH:mm:ss.SSS"));
    // console.log("\n");

    queries = await genQuery(queries, path[i], 3, startDate, endDate);
  }

  console.log(queries);
  queries.forEach(async (query) => {
    await sql.query(`${query}`);
  });
}

async function nextFreeTime(station) {
  return await sql.query`SELECT TOP 1 TimeStamp FROM dbo.LocPalHistory WHERE LocationName LIKE ${station} AND PalNo = 0 ORDER BY TimeStamp DESC`;
}

/*
gets the kranId from the SampleValueHistoryValue_Ids
*/
async function getKranId(taktplatz) {
  let kranId = await sql.query(
    `SELECT Id FROM SampleValueHistoryValue_Ids WHERE Value_ID LIKE '${taktplatz.replace(
      /\s/g,
      ""
    )}_Pos'`
  );
  return kranId.recordset[0].Id;
}

async function genQvQuery(query, taktplatz, startMoment, endMoment) {
  // es ist ein Kran

  let kranId = await getKranId(taktplatz); // id of the kran

  let indexOfTaktplatz = parseInt(path.indexOf(taktplatz)); // gets the index of the taktplatz in the path array
  // with the index of the taktplatz you can get the taktplätze that are before and after the original taktplatz
  let taktplatzbef = path[indexOfTaktplatz - 1]; // one Taktplatz before

  // one extra case
  if (taktplatzbef == "TP 17" && taktplatz == "QV 5") taktplatzbef = "TP 17.1";
  else if (taktplatzbef == "TP 17" && taktplatz == "QV 6")
    taktplatzbef = "TP 17.2";

  // get the index of the taktplatz before
  let index = qv_index[taktplatzbef];

  // query one - set the startindex and the startmoment of the kran

  //let queryStr = `INSERT INTO SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) VALUES ('${kranId}', ${index}, '${moment(startMoment).format("YYYY-MM-DD HH:mm:ss.SSS")}');`;

  query.push(
    `INSERT INTO SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) VALUES ('${kranId}', ${index}, '${moment(
      startMoment
    ).format("YYYY-MM-DD HH:mm:ss.SSS")}');`
  );

  let taktplatzaf = path[indexOfTaktplatz + 1]; // one Taktplatz after

  // one extra case
  if (taktplatzaf == "TP 17" && taktplatz == "QV 5") taktplatzaf = "TP 17.1";
  else if (taktplatzaf == "TP 17" && taktplatz == "QV 6")
    taktplatzaf = "TP 17.2";

  index = qv_index[taktplatzaf]; // get the index of the taktplatz before

  // query two - set the endindex and the enmoment of the kran
  //queryStr += `INSERT INTO SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) VALUES ('${kranId}', ${index}, '${moment(endMoment).format("YYYY-MM-DD HH:mm:ss.SSS")}');`;

  query.push(
    `INSERT INTO SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) VALUES ('${kranId}', ${index}, '${moment(
      endMoment
    ).format("YYYY-MM-DD HH:mm:ss.SSS")}');`
  );

  // query threee - set the kran to defaultposition one minute after  endmoment
  //queryStr += `INSERT INTO SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) VALUES ('${kranId}', ${index}, '${moment(endMoment).format("YYYY-MM-DD HH:mm:ss.SSS")}');`;
  query.push(
    `INSERT INTO SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) VALUES ('${kranId}', 0, '${moment(
      endMoment
    )
      .add(1, "m")
      .format("YYYY-MM-DD HH:mm:ss.SSS")}');`
  );

  return query;
}

/*
generates a set of queries for each Taktplatz. 
If the Taktplatz type is of TP it generates 2 queries
if the Taktplatz type is QV it generates 5 queries: 
2 of them are the same as the ones of TP, the other 
3 are for the crane position and queries another database
*/
async function genQuery(query, taktplatz, palette, startMoment, endMoment) {
  // first query - sets the moment at wich the palette arrives at the
  query.push(
    `INSERT INTO LocPalHistory (LocationName, PalNo, TimeStamp) VALUES ('${taktplatz}', ${palette}, '${moment(
      startMoment
    ).format("YYYY-MM-DD HH:mm:ss.SSS")}');`
  );
  // detects if it's a crane
  if (taktplatz.startsWith("Q"))
    await genQvQuery(query, taktplatz, startMoment, endMoment);
  // seccond query - frees up the taktplatz - at the same moment the palette gets set to new taktplatz
  query.push(
    `INSERT INTO LocPalHistory (LocationName, PalNo, TimeStamp) VALUES ('${taktplatz}', 0, '${moment(
      endMoment
    ).format("YYYY-MM-DD HH:mm:ss.SSS")}');`
  );

  if(taktplatz=="TP 24"){
    moveRBG(query,palette,endMoment);
  }


  return query;
}

async function moveRBG(query,palette,endMoment){

  temp = storageIndex.split("|");

  destEtage= temp[0];
  destRow = temp[1];
  
  //move cran to TP 24

  query.push(`insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (8,${storage_index["TP 24"]},'${moment(
    endMoment
  ).format("YYYY-MM-DD HH:mm:ss.SSS")}');`);	
  query.push(`insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (2,${storage_index["E 0"]},'${moment(
    endMoment
  ).format("YYYY-MM-DD HH:mm:ss.SSS")}');`);	

  //move cran to destination with delay

  endMoment = moment(endMoment).add(3, "minutes");

  query.push(`insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (8,${storage_index["E "+destEtage]},'${moment(
    endMoment
  ).format("YYYY-MM-DD HH:mm:ss.SSS")}');`);	
  query.push(`insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (2,${storage_index["R "+destRow]},'${moment(
    endMoment
  ).format("YYYY-MM-DD HH:mm:ss.SSS")}');`);

  endMoment = moment(endMoment).add(1, "minutes");

  //move cran to final 

  query.push(`insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (8,${storage_index["E "+destEtage]},'${moment(
    endMoment
  ).format("YYYY-MM-DD HH:mm:ss.SSS")}');`);	
  query.push(`insert into dbo.SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (2,${storage_index["R "+destRow]},'${moment(
    endMoment
  ).format("YYYY-MM-DD HH:mm:ss.SSS")}');`);

  //store palette
  taktplatz = "LG "+ storageIndex;
  query.push(
    `INSERT INTO LocPalHistory (LocationName, PalNo, TimeStamp) VALUES ('${taktplatz}',${palette} , '${moment(
      endMoment
    ).format("YYYY-MM-DD HH:mm:ss.SSS")}');`
  );



}

async function getLager(storageIndex){

  

}

// freeLG function to check if a Lagerplatz is free
async function occLG() {
  await db.connect();
  let lgs = await db.queryDatabase(
    `SELECT LocationName FROM LocPalHistory WHERE LocationName LIKE 'LG%';`
  );

  // console.dir(lgs.recordset);

  let arrayLG = [];
  lgs.recordset.forEach(async (lg) => {
    arrayLG.push(lg.LocationName);
  });
  return arrayLG;
}

var path = [];
var storage_index = [];
var qv_index = [];
var storageIndex="";
//default path is always 0
function start(path_number = -1, date,storageindex) {
  if (path_number == -1) console.error("no path given");

  storageIndex= storageindex;

  //do something with date

  //select the path with path_number
  path = values.paths[path_number].path;

  console.info(values.qv_index.length);
  //dynamically create a qv_index key value pair
  for (let i = 0; i < values.qv_index.length; i++) {
    qv_index[values.qv_index[i].name] = values.qv_index[i].index;
  }
  for (let i = 0; i < values.storage_index.length; i++) {
    storage_index[values.storage_index[i].name] = values.storage_index[i].index;
  }
  console.log(storage_index);
  console.log(qv_index);
  console.log("Chosen path:" + values.paths[path_number].name);
  writeToDB();
}
// export functions
module.exports = {
  start,
  genQuery,
  genQvQuery,
  getKranId,
  nextFreeTime,
  occLG,
};
