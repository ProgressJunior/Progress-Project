const { json } = require("express");
const express = require("express");
const app = express();
require("dotenv").config();
const sql = require("mssql");
var moment = require("moment");
const db = require('./db');

let queries = [];
let minute = 0;
let dt = new Date();

async function main() {


    await db.connect()

	let startDate = moment(new Date())
	let endDate = moment(new Date())
	let duration = 0

	for (let i = 0; i < path.length - 2; i++) {
		startDate = endDate

		path[i].startsWith("Q") ? duration = 2 : duration = 1
		endDate = moment(startDate).add(duration, "minutes")

		// 1 hour needs to be subtract because casting to moment adds 1 hour
		let nextFreeTs = await sql.query`SELECT TOP 1 TimeStamp FROM dbo.LocPalHistory WHERE LocationName LIKE ${path[i+1]} AND PalNo = 0 ORDER BY TimeStamp DESC`
        //check if attribute of json is empty
        if (nextFreeTs.recordset.length > 0) {
            nextFreeTs = moment(nextFreeTs.recordset[0].TimeStamp).subtract(2, "hours")
            nextFreeTs = moment(nextFreeTs).add(1, "minutes")
            console.log("NextFreeTs: " + nextFreeTs.format("YYYY-MM-DD HH:mm:ss.SSS"));
            
            if (moment(endDate).isBefore(nextFreeTs)) {
                console.log("Palette has to wait")
                endDate = nextFreeTs
            }
        }

		console.log("Starttime: " + startDate.format("YYYY-MM-DD HH:mm:ss.SSS"))
		console.log(path[i+1] + " free at ");
		console.log(nextFreeTs);
		console.log("Endtime:   " + endDate.format("YYYY-MM-DD HH:mm:ss.SSS"));
		console.log("\n");

		await genQuery(path[i], 2, startDate, endDate)
	}

	console.log(queries)
    queries.forEach(async (query) => {await sql.query(`${query}`)})
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
async function getKranId(taktplatz) {
    let kranId = await sql.query(
        `SELECT Id FROM SampleValueHistoryValue_Ids WHERE Value_ID LIKE '${taktplatz.replace(
            /\s/g,
            ""
        )}_Pos'`
    );
    return kranId.recordset[0].Id;
}

async function genQvQuery(taktplatz, startMoment, endMoment) {
    // es ist ein Kran

    let kranId = await getKranId(taktplatz); // id of the kran

    let indexOfTaktplatz = parseInt(path.indexOf(taktplatz)); // gets the index of the taktplatz in the path array
    // with the index of the taktplatz you can get the taktplätze that are before and after the original taktplatz
    let taktplatzbef = path[indexOfTaktplatz - 1]; // one Taktplatz before

    // one extra case
    if (taktplatzbef == "TP 17" && taktplatz == "QV 5")
        taktplatzbef = "TP 17.1";
    else if (taktplatzbef == "TP 17" && taktplatz == "QV 6")
        taktplatzbef = "TP 17.2";

    // get the index of the taktplatz before
    let index = qv_index[taktplatzbef];

    // query one - set the startindex and the startmoment of the kran
    queries.push(
        `INSERT INTO SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) VALUES ('${kranId}', ${index}, '${moment(startMoment).format(
            "YYYY-MM-DD HH:mm:ss.SSS"
        )}');`
    );

    let taktplatzaf = path[indexOfTaktplatz + 1]; // one Taktplatz after

    // one extra case
    if (taktplatzaf == "TP 17" && taktplatz == "QV 5") taktplatzaf = "TP 17.1";
    else if (taktplatzaf == "TP 17" && taktplatz == "QV 6")
        taktplatzaf = "TP 17.2";

    index = qv_index[taktplatzaf]; // get the index of the taktplatz before

    // query two - set the endindex and the enmoment of the kran
    queries.push(
        `INSERT INTO SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) VALUES ('${kranId}', ${index}, '${moment(endMoment).format(
            "YYYY-MM-DD HH:mm:ss.SSS"
        )}');`
    );
    // query threee - set the kran to defaultposition one minute after  endmoment
    queries.push(
        `INSERT INTO SampleValueHistoryT (Value_Id_Ref, Value, TimeStamp) VALUES ('${kranId}', 0, '${moment(endMoment)
            .add(1, "m")
            .format("YYYY-MM-DD HH:mm:ss.SSS")}');`
    );
}

/*
generates a set of queries for each Taktplatz. 
If the Taktplatz type is of TP it generates 2 queries
if the Taktplatz type is QV it generates 5 queries: 
2 of them are the same as the ones of TP, the other 
3 are for the crane position and queries another database
*/
async function genQuery(taktplatz, palette, startMoment, endMoment) {

    // first query - sets the moment at wich the palette arrives at the
    queries.push(
        `INSERT INTO LocPalHistory (LocationName, PalNo, TimeStamp) VALUES ('${taktplatz}', ${palette}, '${moment(startMoment).format(
            "YYYY-MM-DD HH:mm:ss.SSS"
        )}');`
    );
    // detects if it's a crane
    if (taktplatz.startsWith("Q"))
        await genQvQuery(taktplatz, startMoment, endMoment);
    // seccond query - frees up the taktplatz - at the same moment the palette gets set to new taktplatz
    queries.push(
        `INSERT INTO LocPalHistory (LocationName, PalNo, TimeStamp) VALUES ('${taktplatz}', 0, '${moment(endMoment).format(
            "YYYY-MM-DD HH:mm:ss.SSS"
        )}');`
    );
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