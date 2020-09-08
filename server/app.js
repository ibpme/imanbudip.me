const express = require("express");
const app = express();
const morgan = require("morgan");

const blogsRoute = require("./routes/blogs");
const imagesRoute = require("./routes/images");

const mongoose = require("mongoose");
const databaseUrl =
  process.env.MONGO_URL || "mongodb://localhost:27017/website";
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database Connected to:", databaseUrl);
});
db.on("error", (err) => {
  console.error("Connection Error:", err);
});

app.use(morgan("dev"));
app.use(express.json());

//TODO: Add authentication
app.use("/blogs", blogsRoute);
// app.use("/image", imagesRoute);

app.use((err, req, res, next) => {
  //Client Side Error
  console.log(err.name);
  if (
    ["ValidationError", "CastError", " DocumentNotFoundError"].includes(
      err.name
    )
  ) {
    //TODO : Make each error a unique message
    res.status(400).json({ name: err.name, message: err.message });
  }
  if (err.message === "NotFound")
    res.status(404).json({ name: err.name, message: err.message });

  next(err);
});

app.use((err, req, res, next) => {
  //Server Side Error
  console.log({ stack: err.stack, name: err.name });
  res.status(500);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening in PORT :${PORT}`));
