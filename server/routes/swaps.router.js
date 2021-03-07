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
  const queryText = `INSERT INTO "swaps" ("is_private", "start_date", "sell_date", 
  "stop_date", "swap_open", "access_code")
    VALUES($1, $2, $3, $4, $5, $6);`;
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

// PUT route to edit existing swaps
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const swapToEdit = req.params.id;
  const queryText = `UPDATE "swaps" where "id" = $1, "is_private" = $2, 
  "start_date" = $3, sell_date = $4, "stop_date" = $5, "swap_open" = $6, "access_code" = $7;`;
  pool
    .query(queryText, [
      req.body.id,
      req.body.is_private,
      req.body.start_date,
      req.body.stop_date,
      req.body.swap_open,
      req.body.access_code,
      swapToEdit,
    ])
    .then((response) => {
      response.sendStatus(500);
    })
    .catch((error) => {
      console.log(`Error making Edit to database query ${queryText}`, error);
    });
});

module.exports = router;
