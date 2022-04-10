const db = require("./db");

async function main(){
    // connect to db
    await db.connect();
    // query
    const query = "SELECT * FROM LocPalHistory";
    // const query = "SELECT TOP 1 TimeStamp FROM LocPalHistory WHERE LocationName LIKE 'TP 1' AND PalNo = 0 ORDER BY TimeStamp DESC";
    // execute query
    let res = await db.queryDatabase(query);

    console.log(res);
    // close connection
    await db.close();
}


main();