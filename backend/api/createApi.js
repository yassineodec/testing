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

const createTableUsuarios = `
  CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`;

conn.query(createTableUsuarios, (err, results, fields) => {
  if (err) {
    console.error("Error al crear la tabla de user: " + err.stack);
    return;
  }
  console.log("Tabla de usuarios creada exitosamente");
});

// Ejecuta una consulta SQL para crear la tabla de productos
const createTableProductos = `
  CREATE TABLE IF NOT EXISTS productos (
    id VARCHAR(50) PRIMARY KEY,
    nombre_producto VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    km INT NOT NULL,
    numero_contacto VARCHAR(20) NOT NULL,
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN DEFAULT 1,
    user_id INT NOT NULL,
    marca VARCHAR(255) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    anno INT NOT NULL,
    puertas INT NOT NULL,
    color VARCHAR(255) NOT NULL,
    cambio VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
  )
`;

conn.query(createTableProductos, (err, results, fields) => {
  if (err) {
    console.error("Error al crear la tabla de productos: " + err.stack);
    return;
  }
  console.log("Tabla de productos creada exitosamente");
});

const createTableUserData = `
  CREATE TABLE IF NOT EXISTS user_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    valoracion INT NOT NULL,
    mensaje TEXT,
    FOREIGN KEY (user_id) REFERENCES user(id)
  )
`;

// Ejecuta la consulta para crear la tabla user_data
conn.query(createTableUserData, (err, results, fields) => {
  if (err) {
    console.error("Error al crear la tabla user_data: ", err);
    return;
  }
  console.log("Tabla user_data creada con éxito!");
});

const createTableImage = `
CREATE TABLE IF NOT EXISTS image (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(250) NOT NULL,
  name VARCHAR(250) NOT NULL,
  date DATE NOT NULL,
  productos_id VARCHAR(50) NOT NULL,
  FOREIGN KEY (productos_id) REFERENCES productos(id) ON DELETE CASCADE
);
`;

conn.query(createTableImage, (err, results, fields) => {
  if (err) {
    console.error("Error al crear la tabla imagenes: ", err);
    return;
  }
  console.log("Tabla imagenes creada con éxito!");
});

module.exports = data_router;
