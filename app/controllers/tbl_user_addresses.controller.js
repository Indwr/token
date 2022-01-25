const db = require("../models");
const TblUserAddresses = db.tbl_user_address;
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

  const checkIp = await TblIps.findOne({
    where: { user_id: req.body.user_id, ip_address: ip },
  });
  if (checkIp === null) {
    res.status(400).send({
      message: "Ip Addriness not valid please try again later..",
    });
    return;
  }
  const address = {
    hex_address: req.body.hex_address,
    user_id: req.body.user_id,
    address: req.body.address,
    private_key: req.body.private_key,
    datetime: req.body.datetime,
  };

  TblUserAddresses.create(address)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Address.",
      });
    });
};
