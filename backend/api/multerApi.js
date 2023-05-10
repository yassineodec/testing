const models = require("../db/db");
const express = require("express");
const data_router = express.Router();
const mysql = require("mysql");

let conn = mysql.createConnection(models.mysql);
conn.connect();
conn.on("error", (err) => {
  console.log("Re-connecting lost conn: ");
  conn = mysql.createConnection(models.mysql);
});

module.exports = data_router;
