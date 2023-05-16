const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../images"),
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

exports.getImage = (req, res) => {
  let imageName = req.params.filename;
  if (imageName === "undefined") {
    imageName = "null.png"; // ruta de la imagen por defecto
  }
  const imagePath = path.join(__dirname, "../../images", imageName);

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(404).send("Image not found");
    } else {
      res.writeHead(200, { "Content-Type": "image/png" });
      res.write(data);
      res.end();
    }
  });
};

exports.getAnuncioImages = (req, res) => {
  req.getConnection((err, conn) => {
    const sql =
      "SELECT MIN(id) AS id, productos_id, name FROM image GROUP BY productos_id";
    conn.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    });
  });
};

exports.getAnuncioImagesId = (req, res) => {
  const anuncioId = req.params.id; // Obtener el ID del anuncio desde los parámetros de la solicitud

  req.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }

    const sql =
      "SELECT id, productos_id, name FROM image WHERE productos_id = ?";
    conn.query(sql, [anuncioId], (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        const images = results.map((result) => result.name); // Obtener solo los nombres de las imágenes
        res.json(images);
      }
    });
  });
};

const upload = multer({ storage: storage });

exports.upload = upload.array("images", 5);

exports.uploadFile = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    // Verificar si hay archivos en la solicitud
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No se han seleccionado archivos" });
    }

    // Obtener la ID del producto desde los parámetros de la URL
    const productos_id = req.params.id;

    // Procesar cada archivo y guardarlos en la base de datos
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const type = file.mimetype;
      const name = file.originalname;

      // Crear un stream de lectura para la imagen
      const stream = fs.createReadStream(file.path);

      const imageData = { type, name, date: stream, productos_id };

      conn.query(
        "INSERT INTO " + req.params.tabla + " SET ?",
        imageData,
        (err, rows) => {
          if (err) {
            console.log("Error al insertar imagen:", err);
          } else {
            console.log("Imagen insertada correctamente:", imageData);
          }
        }
      );
    }

    res.json({ msg: "Imágenes cargadas satisfactoriamente" });
  });
};
