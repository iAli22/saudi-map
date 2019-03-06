// !init Express
const express = require("express");
const app = express();
// mongooooooo
const mongoose = require("mongoose");
// !Layout
const expressLayout = require("express-ejs-layouts");

// Flash Message & Session
const flash = require("connect-flash");
const session = require("express-session");

// Config passport
const passport = require("passport");
require("./config/passport")(passport);
// DB Connect
const db = require("./config/server").MongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("mongooe DB Connected..."))
  .catch(err => console.log(err));

/**
 *
 * !middleware
 *
 */
// Layout
app.use(expressLayout);
app.set("view engine", "ejs");

// BodyParsar
app.use(express.urlencoded({ extended: false }));

//Express Session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
// Flash middleware
app.use(flash());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Global var
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");

  next();
});

// ?my Router's
app.use("/", require("./routers/index"));
app.use("/user", require("./routers/users"));

// !PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Runing in Port ${PORT}`));
