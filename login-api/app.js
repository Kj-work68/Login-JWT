var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const secret = "Fullstack-login-2024";

app.use(cors());

const mysql = require("mysql2");

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "mydb2",
});

app.post("/register", jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    // Store hash in your password DB.

    connection.execute(
      "INSERT INTO users (email, password, fname, lname) VALUES (?, ?, ?, ?)",
      [req.body.email, hash, req.body.fname, req.body.lname],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } // results contains rows returned by server// fields contains extra meta data about results, if available
        res.json({ status: "ok" });
      }
    );
  });
  // execute will internally call prepare and query
});

app.post("/login", jsonParser, function (req, res, next) {
  connection.execute(
    "SELECT * FROM users WHERE email=?",
    [req.body.email],
    function (err, users, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      } // results contains rows returned by server// fields contains extra meta data about results, if available
      if (users.length == 0) {
        res.json({
          status: "error",
          message: "no user found",
        });
        return;
      }
      bcrypt.compare(
        req.body.password,
        users[0].password,
        function (err, isLogin) {
          // result == true
          if (isLogin) {
            var token = jwt.sign({email: users[0].email}, secret, {expiresIn: '2m'})
            res.json({ status: "ok", message: "Login success", token });
          } else {
            res.json({ status: "error", message: "Cannot Success" });
          }
        }
      );
    }
  );
});


app.post("/authen", jsonParser, function (req, res, next) {
  try{
  const token = req.headers.authorization.split(' ')[1]
    var decoded = jwt.verify(token, secret);
    res.json({status: 'ok', decoded})
  }catch(err){
    res.json({status: 'Error', message: err.message})
  }
  

})

app.listen(3003, function () {
  console.log("CORS-enabled web server listening on port 3003");
});