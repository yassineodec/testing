const models = require("../db/db");
const express = require("express");
const router_datos = express.Router();
const mysql = require("mysql");

const { authenticateToken } = require("./functions");

let conexion = mysql.createConnection(models.mysql);
conexion.connect();
conexion.on("error", (err) => {
  console.log("Re-connecting lost conn: ");
  conexion = mysql.createConnection(models.mysql);
});

router_datos.get("/productos", (req, res) => {
  const sql = "SELECT * FROM productos ORDER BY fecha_publicacion DESC";
  conexion.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

router_datos.get("/productos/:userId", authenticateToken, (req, res) => {
  const userId = req.params.userId;
  const sql =
    "SELECT * FROM productos WHERE user_id = ? ORDER BY fecha_publicacion DESC";
  conexion.query(sql, [userId], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

router_datos.get(
  "/productos/solitario/:productId",
  authenticateToken,
  (req, res) => {
    const productId = req.params.productId;
    const sql = "SELECT * FROM productos WHERE id = ?";
    conexion.query(sql, [productId], (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  }
);

router_datos.delete("/productos/:productId", authenticateToken, (req, res) => {
  const productId = req.params.productId;
  const sql = "DELETE FROM productos WHERE id = ?";
  conexion.query(sql, [productId], (error, results) => {
    if (error) throw error;
    res.json({ message: "Producto eliminado correctamente" });
  });
});

router_datos.post("/productos", authenticateToken, (req, res) => {
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

  conexion.query(sql, values, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error al insertar el producto");
      return;
    }
    console.log(`Producto añadido con ID: ${values[0]}`);
    res.status(201).send(`Producto añadido con ID: ${values[0]}`);
  });
});

router_datos.get("/valoraciones", authenticateToken, (req, res) => {
  const sql = `
  SELECT user_data.valoracion, user_data.mensaje, user.username, user.email 
  FROM user_data 
  JOIN user ON user_data.user_id = user.id 
  ORDER BY user_data.id DESC
  LIMIT 4
`;

  conexion.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

module.exports = router_datos;
