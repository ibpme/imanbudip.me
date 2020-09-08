const express = require("express");
const router = express.Router();
const multer = require("multer");
const Images = require("../schema/ImageSchema");
const Albums = require("../schema/AlbumSchema");

router.get("/", async (req, res, next) => {
  try {
    const allImages = await Images.find();
    res.json(allImages);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const Image = await Images.findById(req.params.id);
    if (Image) res.status(200).json(Image);
    else throw new Error("NotFound");
  } catch (error) {
    next(error);
  }
});

//Request should only handle file uploads to an album
router.post("/upload/:albumId", async (req, res, next) => {
  try {
    const Album = await Albums.findById(req.params.albumId);
    if (!Album) throw new Error("NotFound");
    //TODO: Add code : -Uploads photos and return with URLs specified
    //TODO:            -Push photos url and id into the created/updated album
  } catch (error) {
    next(error);
  }
});

router.put("/update", async (req, res, next) => {
  //* Can only update non-Buffer files
  try {
    req.body.dateModified = Date.now();
    const updateImage = await Images.findByIdAndUpdate(req.body._id, req.body);
    console.log(updateImage);
    if (updateImage) res.status(201).send("Updated !");
    else throw new Error("NotFound");
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const deleteImage = await Images.findByIdAndDelete(req.params.id);
    if (deleteImage) res.status(200).send("Deleted !");
    else throw new Error("NotFound");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
