const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authController = require("/.controllers/auth");

// initialize express app
const app = express();

//config settings
dotenv.config();
const port = process.env.PORT || "3000";
//const port = process.env.PORT ? process.env.PORT : "3000"; //using ternary operation

// connect to mongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// mount middleware:
// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));

app.use("/auth", authController);
// any HTTP request from browser that comes to/ auth...
// will automatically be forward to the router code
// inside of the authController

// mount routes
app.get('/', (req, res) => {
  res.render('index.ejs');
});

// tells the app the listen for HTTP requests 
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
