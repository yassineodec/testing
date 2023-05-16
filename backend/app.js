const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const api = express();

const userApi = require("./api/userApi.js");
const createApi = require("./api/createApi.js");
const dataApi = require("./api/dataApi.js");

// analysis application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({ extended: false }));
// analysis application/json
api.use(bodyParser.json());

api.use(cors());

//cross-domain requests
api.all("*", function (req, res, next) {
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

api.use("/api/user", userApi);
api.use("/api/data", dataApi);
api.use("/api/createApi", createApi);

api.listen(10520);
console.log("Se ha conectado correctamente a la BD");
console.log("----------------------------------");
