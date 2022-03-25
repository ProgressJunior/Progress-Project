const express = require("express");
const app = express();
require("dotenv").config();
/*

        EXPRESS

*/
const express_port = process.env.EXPRESS_PORT;




function startServer(){

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
}


module.exports = {startServer};