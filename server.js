const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authController = require("./controllers/auth");
const session =require("express-session");


// initialize express app
const app = express();

//config settings
dotenv.config();
const port = process.env.PORT || "3001";
// or use this version below
// const port = process.env.PORT ? process.env.PORT : "3000"; //using ternary operation

// connect to mongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// mount middleware:
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded data from forms
app.use(methodOverride("_method")); // Middleware for using HTTP verbs such as PUT or DELETE
app.use(morgan('dev')); // Morgan for logging HTTP requests
app.use(session ({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use("/auth", authController);
// any HTTP request from browser that comes to/ auth...
// will automatically be forward to the router code
// inside of the authController

// mount routes
app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user
  }) 
});

//protected routes - user listewnbr logged in for access
app.get('/vip-lounge', (req,res) => {
  if (req.session.user) {
    res.send("Welcome to the VIP L");
  }else {
    res.send("Sorry,  yo must be logged in for that");
  }
})

// tells the app the listen for HTTP requests 
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

