const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//handles the swaps data. GET POST PUT
// gathers ALL SWAPS
// sends to front end
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT "swaps".* FROM "swaps"
    LEFT JOIN "swap_users" ON "swaps".id = "swap_users".swap_id
    WHERE NOT EXISTS
    ( SELECT * FROM "swap_users" 
    WHERE "swap_users".swap_id = "swaps".id AND "swap_users".user_id = $1)
    GROUP BY "swaps".id
    ORDER BY "swaps".id ASC;
  `;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/ownedswaps", rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT * FROM "swaps" 
    WHERE "owner" = $1
    ORDER BY "id";`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
      // console.log(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/selectedswap/:id", rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  const queryText = `
    SELECT * FROM "swaps" 
    WHERE "id" = $1;`;
  pool
    .query(queryText, [id])
    .then((result) => {
      res.send(result.rows);
      // console.log(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

//insert into SWAPS database
router.post("/", rejectUnauthenticated, (req, res) => {
  const swap = req.body;
  console.log("sending swap", swap);
  const queryText = `
    INSERT INTO "swaps" ("is_private", "start_date", "sell_date", 
    "stop_date", "access_code", "name", "swap_img", "owner")
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
  `;

  pool
    .query(queryText, [
      swap.is_private,
      swap.start_date,
      swap.sell_date,
      swap.stop_date,
      swap.access_code,
      swap.swap_name,
      swap.swap_img,
      req.user.id,
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

//push existing items into swap

router.post("/addToSwap", rejectUnauthenticated, (req, res) => {
  const item = req.body;
  console.log("adding item to swap", item);
  const queryText = `INSERT INTO "swap_item_join" ("item_id", "swap_id")
  VALUES($1, $2)`;
  pool
    .query(queryText, [item.piece_id, item.id])
    .then((response) => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

//join swap item join
// using a get to grab all data from multiple tables
router.get("/swapItems/:id", rejectUnauthenticated, (req, res) => {
  const swapID = req.params.id;

  console.log(`req.params`, req.params);
  console.log("swapID", swapID);

  const queryText = `
  SELECT items.*, ARRAY_AGG(url) image, "categories"."name" AS "category_name", "categories"."display_name",
  "favorites"."id" AS "favorites_id", "favorites"."item_id", "favorites"."user_id" AS "fav_user_id",
  "user"."username", "user"."email", "user"."user_image", "swaps"."id" AS "swap_id", "swaps"."access_code", "swaps"."is_private", "swaps"."sell_date",
  "swaps"."start_date", "swaps"."stop_date", "swaps"."swap_open", "swap_item_join".id AS "swap_item_id" FROM "items"

  LEFT JOIN "categories" ON "items".cat_id = "categories".id
  LEFT JOIN "images" ON "items".id = "images".item_id
  LEFT JOIN "swap_item_join" ON "swap_item_join".item_id = "items".id 
  LEFT JOIN "favorites" ON "favorites".item_id = "items".id
  LEFT JOIN "user" ON "items".user_id = "user".id
  LEFT JOIN "swaps" ON "swaps".id = "swap_item_join".swap_id
  WHERE "swaps".id = $1
  GROUP BY "swaps"."id", "items".id, "categories".name, "categories".display_name, "user"."username", "user"."email", "user"."user_image", "favorites"."id", "swap_item_join".id;`;
  pool
    .query(queryText, [swapID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// JOINS get to grab only the swaps the user has joined
router.get("/swapsJoined", rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT *, "swap_users".id AS "swap_users_id", "swaps".id AS "id"  FROM "swaps"
    JOIN "swap_users" ON "swap_users".swap_id = "swaps".id
    JOIN "user" ON "user".id = "swap_users".user_id
    WHERE "swap_users".user_id = $1;
    `;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      console.log(result);

      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// PUT route to edit existing swaps
router.put("/edit/:id", rejectUnauthenticated, (req, res) => {
  const swapToEdit = req.params.id;
  const queryText = `
    UPDATE "swaps"
    SET "is_private" = $2, "start_date" = $3, sell_date = $4, "stop_date" = $5, 
    "swap_open" = $6, "access_code" = $7, "swap_img" = $8, "owner" = $9, "name" = $10
    WHERE "id" = $1;
  `;

  pool
    .query(queryText, [
      swapToEdit,
      req.body.is_private,
      req.body.start_date,
      req.body.sell_date,
      req.body.stop_date,
      req.body.swap_open,
      req.body.access_code,
      req.body.swap_img,
      req.user.id,
      req.body.swap_name,
    ])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error making Edit to database query ${queryText}`, error);
    });
});

router.delete("/removeFromSwap/:id", rejectUnauthenticated, (req, res) => {
  const id = req.params.id;

  const queryText = `
    DELETE FROM "swap_item_join"
    WHERE "id" = $1
  `;

  pool
    .query(queryText, [id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
