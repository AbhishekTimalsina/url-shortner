const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const {
  postShortenURL,
  getOriginalURL,
  deleteOriginalURL,
} = require("./controller/url");

const { getHomePage } = require("./controller/home");
const { job } = require("./cron.js");

require("dotenv").config();

let MONGOURI = process.env.MONGO_URI;

job.start();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(flash());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(methodOverride("_method"));

app.get("/", getHomePage);

app.post("/", postShortenURL);

app.get("/:id", getOriginalURL);

app.delete("/:id", deleteOriginalURL);

mongoose.connect(MONGOURI).then((res) => {
  console.log("DB Connected");
  app.listen(3000, () => {
    console.log(`Server running at ${process.env.WEB_URI}`);
  });
});
