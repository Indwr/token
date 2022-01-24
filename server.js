const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const app = express();
let router = express.Router();
const Routes = require("./app/routes");

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to byteBotes" });
});
app.use(Routes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
