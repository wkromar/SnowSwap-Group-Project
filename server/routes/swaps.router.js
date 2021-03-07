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
// sends to front end
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

//insert into SWAPS database
router.post("/", rejectUnauthenticated, (req, res) => {
  const swapToStore = req.body;
  console.log("sending swap", swapToStore);
  const queryText = `INSERT INTO "swaps" ("is_private", "start_date", "sell_date", "stop_date", "swap_open", "access_code")
        VALUES($1, $2, $3, $4, $5, $6)`;
  pool
    .query(queryText, [
      swap.is_private,
      swap.start_date,
      swap.sell_date,
      swap.stop_date,
      swap.open,
      swap.access_code,
    ])
    .then((response) => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error in swaps POST", error);
      res.sendStatus(500);
    });
});

module.exports = router;
