const express = require("express");
const routes = express.Router();

const imagesController = require("../controllers/images.controller");

routes.post(
  "/images/:tabla/:id",
  imagesController.upload,
  imagesController.uploadFile
);

routes.get("/images/anuncios", imagesController.getAnuncioImages);
routes.get("/images/anuncio/:id", imagesController.getAnuncioImagesId);
routes.get("/images/:filename", imagesController.getImage);

module.exports = routes;
