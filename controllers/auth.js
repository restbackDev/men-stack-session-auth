const express = require("express");
const router = express.Router(); //route objects, only exclusively only for routing purposes

//NOTE: there are no routes

router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});
// the routwer object is similar to the app object in server js
// however. it only has router functionality

module.exports = router;
