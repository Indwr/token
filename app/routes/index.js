"use strict";

let UserRoutes = require("./user.routes");
let AddressRoutes = require("./user-address.routes");
let IpRoutes = require("./ip.routes");

let all = [].concat(UserRoutes, AddressRoutes, IpRoutes);

module.exports = all;
