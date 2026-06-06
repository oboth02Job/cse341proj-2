const express = require("express")
const app = express()
const port = 3000;
const dotenv = require("dotenv").config()
const mongodb = require("./data/database")
const bodyParser = require("body-parser");
const bookingsRoutes = require("./routes/bookingsRoutes");
const destinationsRoutes = require("./routes/destinationsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const cors = require("cors")
const passport = require("passport");
const session = require("express-session");
const githubStrategy = require("passport-github2").Strategy
require("./config/passport")
const authRoutes = require("./routes/authRoutes")

app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
  }),
);

passport.serializeUser((user, done) => {
  console.log("serializeUser called");
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("deserializeUser called");
  done(null, user);
});

app.use(cors())
app.use(express.json());

app.use(passport.initialize())
app.use(passport.session());

app.use("/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("Hello world from server")
})

app.use("/api-docs", require("./routes/swagger"));
app.use("/booking", require("./routes/bookingsRoutes"));
app.use("/destination", require("./routes/destinationsRoutes"));
app.use("/users", require("./routes/usersRoutes"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  next();
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(port, () => {
          console.log(`The server is running on port: ${port}`);
        });
    }
})
