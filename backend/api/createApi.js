const models = require("../db/db");
const express = require("express");
const db_router = express.Router();
const mysql = require("mysql");

let conexion = mysql.createConnection(models.mysql);

conexion.connect();

conexion.on("error", (err) => {
  console.log("Re-connecting lost conn: ");
  conexion = mysql.createConnection(models.mysql);
});

const createTableUsuarios = `
  CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`;

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
    marca VARCHAR(255) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    anno INT NOT NULL,
    puertas INT NOT NULL,
    color VARCHAR(255) NOT NULL,
    cambio VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
    )
    `;

const createTableUserData = `
    CREATE TABLE IF NOT EXISTS user_data (
      id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  valoracion INT NOT NULL,
  mensaje TEXT,
  FOREIGN KEY (user_id) REFERENCES user(id)
  )
  `;
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

// Tabla Usuario
conexion.query(createTableUsuarios, (err, results, fields) => {
  if (err) {
    console.error("Error al crear la tabla de user: " + err.stack);
    return;
  }

  if (results.warningCount === 0) {
    console.log("Tabla de usuarios creada exitosamente");
  } else {
    console.log("La tabla de usuarios ya existe");
  }
});
// Tabla Coches
conexion.query(createTableProductos, (err, results, fields) => {
  if (err) {
    console.error("Error al crear la tabla de productos: " + err.stack);
    return;
  }

  if (results.warningCount === 0) {
    console.log("Tabla de productos creada exitosamente");
  } else {
    console.log("La tabla de productos ya existe");
  }
});
// Tabla Valoraciones
conexion.query(createTableUserData, (err, results, fields) => {
  if (err) {
    console.error("Error al crear la tabla user_data: " + err.stack);
    return;
  }

  if (results.warningCount === 0) {
    console.log("Tabla user_data creada con éxito!");
  } else {
    console.log("La tabla user_data ya existe");
  }
});
// Tabla Imagenes
conexion.query(createTableImage, (err, results, fields) => {
  if (err) {
    console.error("Error al crear la tabla imagenes: ", err);
    return;
  }

  if (results.warningCount === 0) {
    console.log("Tabla imagenes creada con éxito!");
  } else {
    console.log("La tabla imagenes ya existe");
  }
});

//Cerrar Conexion
conexion.end((err) => {
  if (err) {
    console.log("Error al cerrar conexion: ", err);
  } else {
    console.log("Conexion cerrada con exito.");
  }
});

module.exports = db_router;
