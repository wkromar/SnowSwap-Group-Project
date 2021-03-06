const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

//take item from user and place it into the database
router.post("/", rejectUnauthenticated, (req, res) => {
  const itemToStore = req.body;
  console.log("sending item", itemToStore);
  const queryText = `INSERT INTO '`;
});
