var express = require('express');
var cors = require('cors');
var app = express();


app.use(cors());

const mysql = require("mysql2")

// create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "mydb2"
});

app.post("/register", jsonParser,  )

app.listen(3005, function (){
    console.log("CORS-enabled web server Listening on port 3005")
})