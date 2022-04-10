const express = require("express");
const app = express();
const index = require("./index.js");
//import cleardb
const clearDB = require("./clearDB.js");
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
    clearDB.main();
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
