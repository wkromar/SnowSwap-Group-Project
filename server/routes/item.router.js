const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

//handles the individual items users place into swaps.

//take item from user and place it into the  ITEM database
//fields not filled out will become null
router.post("/", rejectUnauthenticated, (req, res) => {
  const itemToStore = req.body;
  console.log("sending item", itemToStore);
  const queryText = `INSERT INTO "items" ("user_id", "cat_id", "size", "price", "flex", "style", "brand", "shape", "gender", "profile", "condition", "lacing_system", "purchased", "description")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`;
  pool
    .query(queryText, [
      item.user_id,
      item.cat_id,
      item.size,
      item.price,
      item.flex,
      item.style,
      item.brand,
      item.shape,
      item.gender,
      item.profile,
      item.condition,
      item.lacing_system,
      item.purchased,
      item.description,
    ])
    .then((response) => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

//return contents of ITEM's table where the user ID matches the
//user_id of the item being grabbed.

router.get;
