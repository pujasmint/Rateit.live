require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const fileUpload = require ("express-fileupload");


const session = require("express-session");
const passport = require("passport");

require("./configs/passport");

// IF YOU STILL DIDN'T, GO TO 'configs/passport.js' AND UN-COMMENT OUT THE WHOLE FILE

mongoose
  .connect("mongodb://localhost/project-management-server", {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ADD SESSION SETTINGS HERE:
app.use(
  session({
    secret: "some secret goes here",
    resave: true,
    saveUninitialized: true
  })
);

// USE passport.initialize() and passport.session() HERE:
app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:
app.use(
  cors({
    credentials: true,
    origin: true
  })
);

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}))

// ROUTES MIDDLEWARE STARTS HERE:
const index = require("./routes/index");
app.use("/", index);
const authRoutes = require("./routes/auth-routes");
app.use("/auth", authRoutes);
const sessionRoutes = require("./routes/session-routes");
app.use("/session", sessionRoutes);

module.exports = app;