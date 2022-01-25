const db = require("../models");
const TblIps = db.tbl_ips;
const Op = db.Sequelize.Op;
const sha1 = require("sha1");

// Create and Save a new User
exports.create = async (req, res) => {
  if (!req.body.user_id) {
    res.status(400).send({
      message: "User Id can not be empty!",
    });
    return;
  }

  let ip = req.socket.remoteAddress;

  const ipAddress = {
    ip_address: ip,
    user_id: req.body.user_id,
  };
  TblIps.create(ipAddress)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ip Address.",
      });
    });
};
