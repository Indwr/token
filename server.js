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
  origin: [
    "http://localhost:3001",
    "http://localhost:3000",
    "https://metapetscoin.com",
    "https://blockchain-metapetscoin.netlify.app",
  ],
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Metapetscoin" });
});
app.use(Routes);

// set port, listen for requests
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
