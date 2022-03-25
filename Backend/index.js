const { json } = require("express");
const express = require("express");
const app = express();
require("dotenv").config();
const sql = require("mssql");
var moment = require('moment');  


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


  // for(i=0;i<path.length;i++){
  //   e = path[i];
  //   //console.log(dt)
  //   if(e.startsWith("Q")) await genQuery(e, 2, 2, dt)
  //   else await genQuery(e, 2, 1, dt)
  // }

  let currentEndTime = Date.now()
  let currentStartTime;

  for(let i = 0; i < path.length; i++){

    currentStartTime = currentEndTime
    // CurrentEndTime = Ankunftszeit bei path[i]

    // Extra steps wird mit currentEndTime gequeriet
    // Da currentEndTime vor dem addieren der duration
    // gleich der Ankunftszeit ist
    // extraSteps(path[i], currentStartTime)

    
    // Endzeit von momentanem Vorgang wird berechnent
    // indem jedes mal die Duration vom Vorgang hinzu
    // gezählt wird
    let duration = 0;
    path[i].startsWith("Q") ? duration = 2 : duration = 1;
    currentEndTime = moment(currentStartTime).add(duration, 'm').toDate();

    // CurrentEndTime = Abfahrtzeit bei path[i]


    // schauen wann als nächstes frei
    let nextFreeTs = await sql.query`select Max(Timestamp) from dbo.LocPalHistory where LocationName like ${path[i+1]} and PalNo = 2`
    nextFreeTs = nextFreeTs.recordset[0][""]

    // Wenn nächste Station erst NACH dem fertigstellen
    // des momentanen Prozesses frei ist, wird
    // currentEndTime auf die Zeit gesetzt,
    // wann die nächste Station frei wird
    if (moment(currentEndTime).isBefore(nextFreeTs)){
      // Query mit nextFreeTs
      currentEndTime = nextFreeTs
    }

    // currentEndTime besagt, wann es die Momentane Station
    // verlässt und bei der nächsten Station ankommt

    // Query für path[i] generieren mit currentStartTime und currentEndTime
    // console.log(path[i] + " geht von " + currentStartTime + " bis " + currentEndTime);
    await genQuery(path[i], 2, moment(currentStartTime), moment(currentEndTime))
  }

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


/*
gets the kranId from the SampleValueHistoryValue_Ids
*/
async function getKranId(taktplatz){
  let kranId = await sql.query(`SELECT Id FROM SampleValueHistoryValue_Ids WHERE Value_ID LIKE '${taktplatz.replace(/\s/g, "")}_Pos'`);
  return kranId.recordset[0].Id;
}

async function genQvQuery(taktplatz, startMoment, endMoment){
  // es ist ein Kran

  let kranId = await getKranId(taktplatz);  // id of the kran
  
  let indexOfTaktplatz = parseInt(path.indexOf(taktplatz));   // gets the index of the taktplatz in the path array
  // with the index of the taktplatz you can get the taktplätze that are before and after the original taktplatz
  let taktplatzbef = path[indexOfTaktplatz-1]   // one Taktplatz before

  // one extra case
  if(taktplatzbef == "TP 17" && taktplatz == "QV 5") taktplatzbef = "TP 17.1"
  else if (taktplatzbef == "TP 17" && taktplatz == "QV 6") taktplatzbef = "TP 17.2"

  // get the index of the taktplatz before
  let index = qv_index[taktplatzbef]

  // query one - set the startindex and the startmoment of the kran
  queries.push(`INSERT INTO SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) VALUES ('${kranId}', ${index}, '${startMoment.format('YYYY-MM-DD HH:mm:ss.SSS')}');`);
  

  let taktplatzaf = path[indexOfTaktplatz+1]   // one Taktplatz after

  // one extra case
  if(taktplatzaf == "TP 17" && taktplatz == "QV 5") taktplatzaf = "TP 17.1"
  else if (taktplatzaf == "TP 17" && taktplatz == "QV 6") taktplatzaf = "TP 17.2"

  index = qv_index[taktplatzaf] // get the index of the taktplatz before


  // query two - set the endindex and the enmoment of the kran
  queries.push(`INSERT INTO SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) VALUES ('${kranId}', ${index}, '${endMoment.format('YYYY-MM-DD HH:mm:ss.SSS')}');`);
  // query threee - set the kran to defaultposition one minute after  endmoment
  queries.push(`INSERT INTO SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) VALUES ('${kranId}', 0, '${endMoment.add(1, 'm').format('YYYY-MM-DD HH:mm:ss.SSS')}');`);
}


/*
generates a set of queries for each Taktplatz. 
If the Taktplatz type is of TP it generates 2 queries
if the Taktplatz type is QV it generates 5 queries: 2 of them are the same as the ones of TP, the other 3 are for the crane position and queries another database


*/
async function genQuery(taktplatz, palette, startMoment, endMoment) {

  // first query - sets the moment at wich the palette arrives at the 
  queries.push(`INSERT INTO LocPalHistory (LocationName, PalNo, TimeStamp) VALUES ('${taktplatz}', ${palette}, '${startMoment.format('YYYY-MM-DD HH:mm:ss.SSS')}');`);
  // detects if it's a crane
  if(taktplatz.startsWith("Q")) await genQvQuery(taktplatz, startMoment, endMoment)
  // seccond query - frees up the taktplatz - at the same moment the palette gets set to new taktplatz
  queries.push(`INSERT INTO LocPalHistory (LocationName, PalNo, TimeStamp) VALUES ('${taktplatz}', 0, '${endMoment.format('YYYY-MM-DD HH:mm:ss.SSS')}');`);
  
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