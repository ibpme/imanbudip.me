const express = require("express");
const router = express.Router();
const Blogs = require("../schema/BlogSchema");

router.get("/", async (req, res, next) => {
  try {
    const allBlogs = await Blogs.find();
    res.json(allBlogs);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    if (blog) res.status(200).json(blog);
    else throw new Error("NotFound");
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const createdBlog = new Blogs(req.body);
    await createdBlog.save();
    res.status(201).send("Created");
  } catch (error) {
    next(error);
  }
});

//Idea is to make take the id out of the admin page to edit
router.put("/update", async (req, res, next) => {
  try {
    req.body.dateModified = Date.now();
    const updateBlog = await Blogs.findByIdAndUpdate(req.body._id, req.body);
    console.log();
    if (updateBlog) res.status(201).send("Updated !");
    else throw new Error("NotFound");
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const deleteBlog = await Blogs.findByIdAndDelete(req.params.id);
    if (deleteBlog) res.status(200).send("Deleted !");
    else throw new Error("NotFound");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
