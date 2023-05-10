const models = require("../db/db");
const express = require("express");
const user_router = express.Router();
const mysql = require("mysql");
const $sql = require("../db/sqlMap");

const { getAuthConfig } = require("./functions");
const { authenticateToken } = require("./functions");

const authConfig = getAuthConfig();

let conn = mysql.createConnection(models.mysql);
conn.connect();
conn.on("error", (err) => {
  console.log("Re-connecting lost conn: ");
  conn = mysql.createConnection(models.mysql);
});

user_router.post("/login", (req, res) => {
  const user = req.body;
  const sel_username =
    $sql.user.select + " where username = '" + user.username + "'";
  conn.query(sel_username, (error, results) => {
    if (error) {
      console.log(error);
    }
    console.log(results);
    if (results[0] === undefined) {
      res.json({
        code: "-1",
        message: "la contraseña o son usuario incorrectos",
      });
    } else {
      if (parseInt(Date.now() / 1000) - results[0].block_time < 300) {
        res.json({
          code: "2",
          message: "blocked please wait",
        });
      } else if (
        results[0].username == user.username &&
        results[0].password == user.password
      ) {
        const token = authConfig.jwt.sign(
          { username: user.username },
          authConfig.jwtSecret
        );
        console.log(token);
        res.json({
          code: "0",
          message: "login succeed",
          token: token,
          id: results[0].id,
        });
      } else {
        if (results[0].failed_times >= 4) {
          conn.query(
            $sql.user.update_failed_times,
            [0, user.username],
            (error, results) => {
              if (error) {
                console.log(error);
              } else {
                console.log(Date.now());
                conn.query(
                  $sql.user.update_block_time,
                  [parseInt(Date.now() / 1000), user.username],
                  (error, results) => {
                    if (error) {
                      console.log(error);
                    } else {
                      res.json({
                        code: "2",
                        message: "blocked please wait",
                      });
                    }
                  }
                );
              }
            }
          );
        } else {
          conn.query(
            $sql.user.update_failed_times,
            [results[0].failed_times + 1, user.username],
            (error, results) => {
              if (error) {
                console.log(error);
              } else {
                res.json({
                  code: "1",
                  message: "wrong password",
                });
              }
            }
          );
        }
      }
    }
  });
});

user_router.post("/add", (req, res) => {
  const params = req.body;
  const sel_sql =
    $sql.user.select + " where username = '" + params.username + "'";
  const add_sql = $sql.user.add;

  conn.query(sel_sql, (error, results) => {
    if (error) {
      console.log(err);
    }
    if (results.length != 0 && params.username == results[0].username) {
      res.json({
        code: "-1",
        message: "username occupied",
      });
    } else {
      conn.query(
        add_sql,
        [params.username, params.email, params.password],
        (err, rst) => {
          if (err) {
            console.log(err);
          } else {
            console.log(rst);
            res.json({
              code: "0",
              message: "register succeed",
            });
          }
        }
      );
    }
  });
});

user_router.get("/userdetails", authenticateToken, (req, res) => {
  const username = req.query.username;

  const sql = $sql.user.select + " where username = ?";
  const values = [username];

  conn.query(sql, values, (error, results) => {
    if (error) {
      console.log(error);
      res.json({
        code: "-1",
        message: "error",
      });
    } else if (results.length == 0) {
      res.json({
        code: "-1",
        message: "no user found",
      });
    } else {
      const user = results[0];
      res.json({
        code: "0",
        message: "success",
        data: {
          username: user.username,
          email: user.email,
          password: user.password,
        },
      });
    }
  });
});

user_router.put("/updateuser", authenticateToken, (req, res) => {
  const username = req.body.username;
  const email = req.body.email;

  const checkEmailSql = "SELECT * FROM user WHERE email = ?";
  const checkEmailValues = [email];

  conn.query(
    checkEmailSql,
    checkEmailValues,
    (checkEmailError, checkEmailResults) => {
      if (checkEmailError) {
        console.log(checkEmailError);
        res.json({
          code: "-1",
          message: "error",
        });
      } else if (checkEmailResults.length > 0) {
        res.json({
          code: "-1",
          message: "email already exists",
        });
      } else {
        const updateSql = "UPDATE user SET email = ? WHERE username = ?";
        const updateValues = [email, username];

        conn.query(updateSql, updateValues, (updateError, updateResults) => {
          if (updateError) {
            console.log(updateError);
            res.json({
              code: "-1",
              message: "error",
            });
          } else {
            res.json({
              code: "0",
              message: "success",
            });
          }
        });
      }
    }
  );
});

user_router.get("/logout", (req, res) => {
  res.json({ message: "Session cerrada" });
});

module.exports = user_router;
