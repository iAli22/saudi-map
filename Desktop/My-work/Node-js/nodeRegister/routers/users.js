const express = require("express");
const router = express.Router();
const User = require("../model/Users");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// !Register Router
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  // validation
  let errors = [];
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "All Fields are Requered!...." });
  }
  // Password Mathc
  if (password !== password2) {
    errors.push({ msg: "Password didn't Match" });
  }

  // Check Password length
  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  // check errors array
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    // if Pass
    User.findOne({ email }).then(user => {
      if (user) {
        // there are User
        errors.push({ msg: "this user already Exist" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2
        });
      }
      // add New User
      const newUser = new User({
        email,
        name,
        password
      });
      //crypt my password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          // new hash Password
          newUser.password = hash;
          // save User
          newUser
            .save()
            .then(user => {
              req.flash("success_msg", " Registration Success");
              res.redirect("/user/login");
            })
            .catch(err => console.log(err));
        });
      });
    });
  }
});

// !Login Router
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/user/login",
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "logged Done");
  res.redirect("/user/login");
});

module.exports = router;
