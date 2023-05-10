const models = require("../db/db");
const express = require("express");
const data_router = express.Router();
const mysql = require("mysql");
const $sql = require("../db/sqlMap");

let conn = mysql.createConnection(models.mysql);
conn.connect();
conn.on("error", (err) => {
  console.log("Re-connecting lost conn: ");
  conn = mysql.createConnection(models.mysql);
});

data_router.get("/productos", (req, res) => {
  const sql = "SELECT * FROM productos ORDER BY fecha_publicacion DESC";
  conn.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

data_router.post("/productos", (req, res) => {
  const {
    id,
    nombre_producto,
    descripcion,
    precio,
    km,
    numero_contacto,
    marca,
    ubicacion,
    anno,
    puertas,
    color,
    cambio,
    user_id,
  } = req.body;

  const sql =
    "INSERT INTO productos (id, nombre_producto, descripcion, precio, km, numero_contacto, marca, ubicacion, anno, puertas, color, cambio, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    id,
    nombre_producto,
    descripcion,
    precio,
    km,
    numero_contacto,
    marca,
    ubicacion,
    anno,
    puertas,
    color,
    cambio,
    user_id,
  ];

  conn.query(sql, values, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error al insertar el producto");
      return;
    }

    console.log(`Producto añadido con ID: ${result.insertId}`);
    res.status(201).send(`Producto añadido con ID: ${result.insertId}`);
  });
});

data_router.get("/valoraciones", (req, res) => {
  const sql = `
  SELECT user_data.valoracion, user_data.mensaje, user.username, user.email 
  FROM user_data 
  JOIN user ON user_data.user_id = user.id 
  ORDER BY user_data.id DESC
  LIMIT 4
`;

  conn.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

module.exports = data_router;
