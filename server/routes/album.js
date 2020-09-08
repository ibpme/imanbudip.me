const express = require("express");
const router = express.Router();
const multer = require("multer");
const Albums = require("../schema/AlbumSchema");

router.get("/", async (req, res, next) => {
  try {
    const allAlbums = await Albums.find();
    res.json(allAlbums);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const Album = await Albums.findById(req.params.id);
    if (Album) res.status(200).json(Album);
    else throw new Error("NotFound");
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const createdAlbum = new Albums(req.body);
    const savedAlbum = createdAlbum.save();
    res.status(201).send(savedAlbum._id);
  } catch (error) {
    next(error);
  }
});

router.put("/update", async (req, res, next) => {
  //* Only used to update non-buffer files/images for the AlbumSchema
  //* To update and create images use images route
  try {
    req.body.dateModified = Date.now();
    const updateAlbum = await Albums.findByIdAndUpdate(req.body._id, req.body);
    console.log(updateAlbum);
    if (updateAlbum) res.status(201).send("Updated !");
    else throw new Error("NotFound");
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const deleteAlbum = await Albums.findByIdAndDelete(req.params.id);
    if (deleteAlbum) res.status(200).send("Deleted !");
    else throw new Error("NotFound");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
