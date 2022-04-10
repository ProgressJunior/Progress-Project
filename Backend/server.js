const express = require("express");
const app = express();
const index = require("./index.js");
const db = require("./db");
require("dotenv").config();

const cors = require("cors");
app.use(cors());
/*

        EXPRESS

*/
const express_port = process.env.EXPRESS_PORT;

function startServer() {
  app.listen(express_port, () => {
    console.log(`Example app listening on port ${express_port}`);
  });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/clear", (req, res) => {
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
    res.send({"OK!": "OK!"});
  });


  app.get("/path/:path/:date/:storageindex", (req, res) => {
    //console.log(req.params.arg);
    // console.log("gavaii was here")
    index.start(req.params.path, req.params.date,req.params.storageindex);
  });

  app.get("/occLG/:date", async (req, res) => {
    // res.send(index.occLG());
   
    data = await index.occLG(req.params.date);
    
    res.send(data);
  });
}
startServer();
