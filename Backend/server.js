const express = require("express");
const app = express();
const index = require("./index.js");
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

  app.get("/path/:path/:date", (req, res) => {
    console.log(req.params.arg);
    index.start(req.params.path, req.params.date);
  });

  app.get("/occLG", async (req, res) => {
    // res.send(index.occLG());

    //await index.occLG();
    //create async
    data = await index.occLG();
    res.send(data);
  });
}
startServer();
