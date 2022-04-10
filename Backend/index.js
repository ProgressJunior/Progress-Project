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

async function writeToDB(date) {
  await db.connect();

  let startDate = moment(date);
  let endDate = moment(date);
  let duration = 0;
  let palette = await genPalNum(startDate);

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

    queries = await genQuery(queries, path[i], palette, startDate, endDate);
  }

  console.log(queries);
  queries.forEach(async (query) => {
    await sql.query(`${query}`);
  });
  queries = [];
}

async function nextFreeTime(station) {
  return sql.query`SELECT TOP 1 TimeStamp FROM LocPalHistory WHERE LocationName LIKE ${station} AND PalNo = 0 ORDER BY TimeStamp DESC`;
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
  let temp = index;

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
    `INSERT INTO SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) VALUES ('${kranId}', ${temp}, '${moment(
      endMoment
    )
      .add(1, "m")
      .format("YYYY-MM-DD HH:mm:ss.SSS")}');`
  );

  return query;
}

async function getBelId() {
  let a = await sql.query(
    `SELECT TOP 1 PalData_Id FROM PalData WHERE PalData_Id NOT IN (SELECT PalData_Id FROM  PalDataBelHistory) ORDER BY NEWID();`
  );
  return a.recordset[0].PalData_Id;
}

async function genBelQuery(query, palette, mom) {
  let belId = await getBelId(); // id of the payload (belegung)

  query.push(
    `INSERT INTO PalDataBelHistory (PalData_Id, PalNo, TimeStamp) VALUES ('${belId}', ${palette}, '${moment(
      mom
    ).format("YYYY-MM-DD HH:mm:ss.SSS")}');`
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
  await db.connect();

  // if taktplatz TP6 is the current taktlatz --> generate the query to set the payload (belegung)
  if (taktplatz == "TP 6") await genBelQuery(query, palette, startMoment);

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
  endMoment = moment(endMoment).format("YYYY-MM-DD HH:mm:ss.SSS");

  if (taktplatz == "TP 5") {
    query.push();
  } else if (taktplatz == "TP 6") {
    console.log("Adding Milestone : Shuttering Finished");
    query.push(
      `INSERT INTO PalDataMilestonesHistory (PalData_Id, TimeStamp, RemovedFromPalUnit,ShutteringFinished,BarsPlaced,GirdersPlaced,ConcretingFinished,EnteredInDryChamber,RemovedFromDryChamber) VALUES ('${palette}', '${endMoment}',0,1,0,0,0,0,0);`
    );
  } else if (taktplatz == "TP 12") {
    console.log("Adding Milestone : Bars Placed");
    query.push(
      `INSERT INTO PalDataMilestonesHistory (PalData_Id, TimeStamp, RemovedFromPalUnit,ShutteringFinished,BarsPlaced,GirdersPlaced,ConcretingFinished,EnteredInDryChamber,RemovedFromDryChamber) VALUES ('${palette}', '${endMoment}',0,1,1,0,0,0,0);`
    );
  } else if (taktplatz == "TP 13") {
    console.log("Adding Milestone : Girders Placed");
    query.push(
      `INSERT INTO PalDataMilestonesHistory (PalData_Id, TimeStamp, RemovedFromPalUnit,ShutteringFinished,BarsPlaced,GirdersPlaced,ConcretingFinished,EnteredInDryChamber,RemovedFromDryChamber) VALUES ('${palette}', '${endMoment}',0,1,1,1,0,0,0);`
    );
  } else if (taktplatz == "TP 23") {
    console.log("Adding Milestone : Concreting Finished");
    query.push(
      `INSERT INTO PalDataMilestonesHistory (PalData_Id, TimeStamp, RemovedFromPalUnit,ShutteringFinished,BarsPlaced,GirdersPlaced,ConcretingFinished,EnteredInDryChamber,RemovedFromDryChamber) VALUES ('${palette}', '${endMoment}',0,1,1,1,1,0,0);`
    );
  }
  // LG bei Path einfuegen
  // Lagerplatz bestimmen
  else if (taktplatz.startsWith("LG")) {
    console.log("Adding Milestone : Entered In Drying Chamber");
    query.push(
      `INSERT INTO PalDataMilestonesHistory (PalData_Id, TimeStamp, RemovedFromPalUnit,ShutteringFinished,BarsPlaced,GirdersPlaced,ConcretingFinished,EnteredInDryChamber,RemovedFromDryChamber) VALUES ('${palette}', '${endMoment}',0,1,1,1,1,1,0);`
    );
  }
  // Finished Variable bei Path einfuegen
  else if (taktplatz == "tbd") {
    query.push(
      `INSERT INTO PalDataMilestonesHistory (PalData_Id, TimeStamp, RemovedFromPalUnit,ShutteringFinished,BarsPlaced,GirdersPlaced,ConcretingFinished,EnteredInDryChamber,RemovedFromDryChamber) VALUES ('${palette}', '${endMoment}',0,1,1,1,1,1,1);`
    );
  }
  if (taktplatz == "TP 24") {
    moveRBG(query, palette, endMoment);
  }
  //await db.close();
  return query;
}

async function moveRBG(query, palette, endMoment) {
  temp = storageIndex.split("|");

  destEtage = temp[0];
  destRow = temp[1];

  
  query.push(
    `INSERT INTO LocPalHistory (LocationName, PalNo, TimeStamp) VALUES ('RBG', ${palette}, '${moment(
      endMoment
    ).format("YYYY-MM-DD HH:mm:ss.SSS")}');`
  );

  //move cran to TP 24

  query.push(
    `insert into SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (8,${
      storage_index["TP 24"]
    },'${moment(endMoment).format("YYYY-MM-DD HH:mm:ss.SSS")}');`
  );
  query.push(
    `insert into SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (2,${
      storage_index["E 0"]
    },'${moment(endMoment).format("YYYY-MM-DD HH:mm:ss.SSS")}');`
  );

  //move cran to destination with delay

  endMoment = moment(endMoment).add(3, "minutes");

  query.push(
    `insert into SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (8,${
      storage_index["R " + destEtage]
    },'${moment(endMoment).format("YYYY-MM-DD HH:mm:ss.SSS")}');`
  );
  query.push(
    `insert into SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (2,${
      storage_index["E " + destRow]
    },'${moment(endMoment).format("YYYY-MM-DD HH:mm:ss.SSS")}');`
  );

  endMoment = moment(endMoment).add(1, "minutes");

  //move cran to final destination

  query.push(
    `insert into SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (8,${
      storage_index["R " + destEtage]
    },'${moment(endMoment).format("YYYY-MM-DD HH:mm:ss.SSS")}');`
  );
  query.push(
    `insert into SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) values (2,${
      storage_index["E " + destRow]
    },'${moment(endMoment).format("YYYY-MM-DD HH:mm:ss.SSS")}');`
  );


  query.push(
    `INSERT INTO LocPalHistory (LocationName, PalNo, TimeStamp) VALUES ('RBG', 0, '${moment(
      endMoment
    ).format("YYYY-MM-DD HH:mm:ss.SSS")}');`
  );



  endMoment = moment(endMoment).add(1, "minutes");

  //store palette
  taktplatz = "LG " + storageIndex;
  query.push(
    `INSERT INTO LocPalHistory (LocationName, PalNo, TimeStamp) VALUES ('${taktplatz}',${palette} , '${moment(
      endMoment
    ).format("YYYY-MM-DD HH:mm:ss.SSS")}');`
  );

  endMoment = moment(endMoment).add(8, "hours");

  query.push(
    `INSERT INTO LocPalHistory (LocationName, PalNo, TimeStamp) VALUES ('${taktplatz}',0, '${moment(
      endMoment
    ).format("YYYY-MM-DD HH:mm:ss.SSS")}');`
  );
}



// freeLG function to check if a Lagerplatz is free
async function occLG(timeStamp) {
  await db.connect();

  // console.log(timeStamp);

  timeStamp = new Date(timeStamp);
  timeStamp = moment(timeStamp).format("YYYY-MM-DD HH:mm:ss.SSS");
  console.log(timeStamp);

  let startMoment = moment(timeStamp).add(29, "minutes");

  let endMoment = moment(startMoment).add(10, "hours");

  console.log("occLG startMoment: " + startMoment.format("YYYY-MM-DD HH:mm:ss.SSS"));
  console.log("occLG endMoment: " + endMoment.format("YYYY-MM-DD HH:mm:ss.SSS"));

  let lgs = await db.queryDatabase(
    `SELECT * FROM LocPalHistory WHERE LocationName LIKE 'LG%' AND TimeStamp >= '${moment(
      startMoment
    ).format("YYYY-MM-DD HH:mm:ss.SSS")}' AND TimeStamp <=  '${moment(
      endMoment
    ).format("YYYY-MM-DD HH:mm:ss.SSS")}';`
  );

  // console.dir(lgs.recordset);

  let arrayLG = [];

  lgs.recordset.forEach(async (lg) => {
    arrayLG.push(lg.LocationName);
  });
  console.log("Occupied LGs:");
  console.log(arrayLG);
  return arrayLG;
}

var path = [];
var storage_index = [];
var qv_index = [];
var storageIndex = "";
//default path is always 0
function start(path_number = -1, date, storageindex) {
  if (path_number == -1) console.error("no path given");

  storageIndex = storageindex;

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
  writeToDB(date);
}

/*
  Function to generate a random Palettenumber
  The importance here is to generate a number that is not already in the database
*/
async function genPalNum(timeStamp) {

  //timeStamp = new Date(timeStamp);
  timeStamp = moment(timeStamp).format("YYYY-MM-DD HH:mm:ss.SSS");
  console.log(timeStamp);

  let startMoment = moment(timeStamp);

  let endMoment = moment(startMoment).add(40, "minutes");

  let palNum = Math.floor(Math.random() * 40);
  palNum++;
  let query = `SELECT * FROM LocPalHistory WHERE PalNo LIKE ${palNum} AND TimeStamp >= ${moment(startMoment).format("YYYY-MM-DD HH:mm:ss.SSS")} AND Timestamp <= ${moment(endMoment).format("YYYY-MM-DD HH:mm:ss.SSS")};`
  console.log(query);
  let palNumExists = await db.queryDatabase(
    `SELECT * FROM LocPalHistory WHERE PalNo LIKE ${palNum} AND TimeStamp >= '${moment(startMoment).format("YYYY-MM-DD HH:mm:ss.SSS")}' AND Timestamp <= '${moment(endMoment).format("YYYY-MM-DD HH:mm:ss.SSS")}';`
  );
  if (palNumExists.recordset.length > 0) {
    palNum = await genPalNum();
  }
  return palNum;
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
