const db = require("./db");

async function main(){
    // connect to db
    await db.connect();
    // clear db
    // query
    const query = "DELETE  FROM LocPalHistory WHERE LocPalHistory_Id > 1;DELETE  FROM SampleValueHistoryT WHERE SampleValueHistory_Id > 1;DELETE  FROM PalDataBelHistory WHERE PalDataBelHistory_Id > 1;DELETE  FROM PalDataMilestonesHistory WHERE PalDataMilestonesHistory_Id > 1;";
    // execute query
    await db.queryDatabase(query);
    console.log("DB cleared");
    // close connection
    await db.close();
}


main();