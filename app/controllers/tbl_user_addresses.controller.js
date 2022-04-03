const db = require("../models");
const TblUserAddresses = db.tbl_user_address;
const TotalStackedToken = db.tblTotalStacked;
const TblIps = db.tbl_ips;
const sequelize = require("sequelize");
const Op = db.Sequelize.Op;
const sha1 = require("sha1");
const Web3 = require("web3");
const Common = require("@ethereumjs/common");
const axios = require("axios");
const BigNumber = require("bignumber.js");

exports.getListingLockedToken = async (req, res) => {
  const { address } = req.body;
  const totalStackedToken = await TblUserAddresses.findAll({
    where: {
      userAddress: address,
    },
  });
  let totalListingLockedToken = totalStackedToken ?? [];
  res.status(200).send({
    success: 1,
    status: "success",
    totalListingLockedToken: totalListingLockedToken,
  });
};

exports.getAbiData = async (req, res) => {
  const { address } = req.body;
  var config = {
    method: "get",
    url: `https://api.bscscan.com/api?module=contract&action=getabi&address=${address}&apikey=5CYGIHYGEG13CK77VGKW42CZ886GYYXZX1`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      res.status(200).send({
        success: 1,
        status: "success",
        data: response.data.result,
        message: "Success",
      });
    })
    .catch(function (error) {
      res.status(400).send({
        success: 0,
        status: "error",
        data: [],
        message: error,
      });
    });
};

exports.getTokenPrice = async (req, res) => {
  var config = {
    method: "get",
    url: "https://api.coingecko.com/api/v3/simple/price?ids=metapets&vs_currencies=USD&include_market_cap=true",
    headers: {},
  };
  let totalStackedToken = await getTotalStacked();
  axios(config)
    .then(function (response) {
      res.status(200).send({
        success: 1,
        status: "success",
        data: JSON.stringify(response.data.metapets.usd),
        totalStackedToken: totalStackedToken * response.data.metapets.usd,
        message: "Success",
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

async function getTotalStacked() {
  const totalStackedToken = await TotalStackedToken.findAll();
  return totalStackedToken[0] === undefined
    ? 0
    : totalStackedToken[0].totalTokens;
}
exports.getTotalStackedToken = async (req, res) => {
  const totalStackedToken = await TotalStackedToken.findAll();
  let totalStackedTokens =
    totalStackedToken[0] === undefined ? 0 : totalStackedToken[0].totalTokens;

  res.status(200).send({
    success: 1,
    status: "success",
    totalStackedToken: totalStackedTokens,
  });
};

exports.getTotalStackedAccordingToPackage = async (req, res) => {
  // const totalStackedToken = await
  const totalStackedToken = await Promise.all([
    TblUserAddresses.findAll({
      group: "package",
      attributes: [
        // "tokenAddress",
        // "userAddress",
        // "package",
        // "totalAmount",
        // "apy",
        // "stackDate",
        // "lockedDay",
        // "endDate",
        // "estimatedInterest",
        // "rawData",
        // "createdAt",
        // "updatedAt",
        [
          sequelize.fn("sum", sequelize.col("noOfStackedToken")),
          "noOfStockedToken",
        ],
      ],
      where: {
        package: "gold",
      },
    }),
    TblUserAddresses.findAll({
      group: "package",
      attributes: [
        // "tokenAddress",
        // "userAddress",
        // "package",
        // "totalAmount",
        // "apy",
        // "stackDate",
        // "lockedDay",
        // "endDate",
        // "estimatedInterest",
        // "rawData",
        // "createdAt",
        // "updatedAt",
        [
          sequelize.fn("sum", sequelize.col("noOfStackedToken")),
          "noOfStockedToken",
        ],
      ],
      where: {
        package: "silver",
      },
    }),
    TblUserAddresses.findAll({
      group: "package",
      attributes: [
        // "tokenAddress",
        // "userAddress",
        // "package",
        // "totalAmount",
        // "apy",
        // "stackDate",
        // "lockedDay",
        // "endDate",
        // "estimatedInterest",
        // "rawData",
        // "createdAt",
        // "updatedAt",
        [
          sequelize.fn("sum", sequelize.col("noOfStackedToken")),
          "noOfStockedToken",
        ],
      ],
      where: {
        package: "diamond",
      },
    }),
  ]);
  res.status(200).send({
    success: 1,
    status: "success",
    gold: totalStackedToken[0].length > 0 ? totalStackedToken[0] : [],
    silver: totalStackedToken[1].length > 0 ? totalStackedToken[1] : [],
    diamond: totalStackedToken[2].length > 0 ? totalStackedToken[2] : [],
  });
};

// Create and Save a new User
exports.create = async (req, res) => {
  const {
    tokenAddress,
    userAddress,
    package,
    totalAmount,
    apy,
    stackDate,
    lockedDay,
    noOfStackedToken,
    endDate,
    estimatedInterest,
    rawData,
  } = req.body;
  const address = {
    tokenAddress: tokenAddress,
    userAddress: userAddress,
    package: package,
    totalAmount: totalAmount,
    apy: apy,
    stackDate: stackDate,
    lockedDay: lockedDay,
    noOfStackedToken: noOfStackedToken,
    endDate: endDate,
    estimatedInterest: estimatedInterest,
    rawData: rawData,
  };
  const totalStackedToken = await TotalStackedToken.findOne();
  const sustainableManagementData = {
    totalTokens:
      parseFloat(totalStackedToken.totalTokens) + parseFloat(totalAmount),
  };
  console.log(sustainableManagementData);
  TotalStackedToken.update(sustainableManagementData, {
    where: { id: totalStackedToken.id },
  });

  TblUserAddresses.create(address)
    .then((data) => {
      return res
        .status(200)
        .send({ success: 1, status: "success", result: data });
    })
    .catch((err) => {
      return res
        .status(500)
        .send({ success: 0, status: "fail", message: err.message });
    });
};

exports.getBnbBalance = async (req, res) => {
  const address = "0xEcf9a23671a63d2f722f7362ECF6A48b1483b302";
  try {
    const web3 = new Web3("https://bsc-dataseed1.binance.org:443");
    let balance = await web3.eth.getBalance(address);
    res.status(200).send({ success: 1, status: "success", balance: balance });
  } catch (err) {
    console.log(err);
    res.status(200).send({ success: 0, status: "fail", message: err });
  }
};

exports.getBebTokenBalance = async (req, res) => {
  const contractAddress = req.body.contract_address;
  const address = req.body.address;

  if (!contractAddress) {
    res.status(200).send({
      success: 0,
      status: "failed",
      message: "Invalid Contract Address",
    });
    return;
  }
  console.log(req.body);
  // const BSC_MAIN = Common.forCustomChain(
  //   "mainnet",
  //   {
  //     name: "bnb",
  //     networkId: 56,
  //     chainId: 56,
  //   },
  //   "petersburg"
  // );
  const web3 = new Web3("https://bsc-dataseed1.binance.org:443");
  let bep20AbiJson = [
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      constant: true,
      inputs: [],
      name: "_decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "_name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "_symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "burn",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "subtractedValue", type: "uint256" },
      ],
      name: "decreaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getOwner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "addedValue", type: "uint256" },
      ],
      name: "increaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "mint",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "sender", type: "address" },
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  var contract = new web3.eth.Contract(bep20AbiJson, contractAddress);
  try {
    var tokenBalance = 0;

    let balance = await contract.methods.balanceOf(address).call();
    let decimals = await contract.methods.decimals().call();
    tokenBalance = parseFloat(balance) / Math.pow(10, decimals);
    const bn = new BigNumber(balance + "e-" + decimals);
    res
      .status(200)
      .send({ success: 1, status: "success", balance: bn.toString() });
  } catch (err) {
    res.status(200).send({ success: 0, status: "fail", message: err });
  }
};
