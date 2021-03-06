const express = require("express");
const bodyParser = require("body-parser");
const router = require("./item.router");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
require("dotenv").config();

//handles the swaps data. GET POST PUT
// gathers ALL SWAPS
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "swaps" ORDER BY "id";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
