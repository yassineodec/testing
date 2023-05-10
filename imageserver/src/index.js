const express = require("express");
const mysql = require("mysql2");
const conn = require("express-myconnection");
const routes = require("./routes/images.routes");
const cors = require("cors");

const app = express();
app.set("port", process.env.PORT || 5000);
const dbConfig = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "password",
  database: "healthcare",
};

app.use(cors());

//cross-domain requests
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(conn(mysql, dbConfig, "single"));

app.use("/", routes);

app.listen(app.get("port"), () => {
  console.log("server running on port", app.get("port"));
});
