const db = require("../models");
const Users = db.tbl_users;
const Op = db.Sequelize.Op;
const sha1 = require("sha1");

// Create and Save a new User
exports.create = async (req, res) => {
  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const checkEmail = await Users.findOne({ where: { email: req.body.email } });
  if (checkEmail !== null) {
    res.status(400).send({
      message: "Email Id Already exist please try another one!",
    });
    return;
  }
  const user = {
    email: req.body.email,
    password: sha1(req.body.password),
    user_id:
      req.body.user_id ??
      parseInt(
        Math.ceil(Math.random() * Date.now())
          .toPrecision(16)
          .toString()
          .replace(".", "")
      ),
  };

  Users.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const user_id = req.query.user_id;
  var condition = user_id ? { user_id: { [Op.like]: `%${user_id}%` } } : null;

  Users.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single user with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Users.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Update a user by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Users.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  Users.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Users.",
      });
    });
};
