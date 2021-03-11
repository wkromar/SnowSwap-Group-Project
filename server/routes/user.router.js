const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const queryText = `INSERT INTO "user" (username, password, first_name, last_name, email)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  pool
    .query(queryText, [username, password, firstName, lastName, email])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// PUT will be handling the edit user profiles
router.put('/updateUserProfile', (req, res) => {
  const userId = req.user.id;

  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const email = req.body.email;
  const preferredPayment = req.body.preferred_payment;
  const paymentUsername = req.body.payment_username;
  const userImage = req.body.user_image;

  console.log('updating profile for user #:', userId);

  const queryText = `
  UPDATE "user" 
  SET "first_name" = $2, "last_name" = $3, "email" = $4,
  "preferred_payment" = $5,  "payment_username" = $6, "user_image" = $7
  WHERE "user".id = $1;
  `;

  pool
    .query(queryText, [
      userId,
      firstName,
      lastName,
      email,
      preferredPayment,
      paymentUsername,
      userImage
    ])
    .then((result) => {
      console.log(result);

      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });

});


router.put('/upgradeUser', rejectUnauthenticated, (req, res, next) => {

  const userId = req.user.id;

  const userToUpgrade = req.body.userNumber;

  console.log(`upgrading ${userToUpgrade} to a Super User`);

  const queryText = `
  SELECT "user".auth_level FROM "user"
  WHERE "user".id = $1;
  `;

  pool.query(queryText, [userId]).then((results) => {
    let authLvl = results.rows[0].auth_level;
    console.log('auth level:', authLvl);

    if (authLvl === 2) {
      const queryText = `
      UPDATE "user" 
      SET "auth_level" = 1
      WHERE "user".id = $1;
      `;

      pool.query(queryText, [userToUpgrade])
        .then((result) => {
          console.log(result);
          res.sendStatus(200);
        })
        .catch((error) => {
          console.log(error);
          res.sendStatus(500);
        });
    }
    else {
      console.log('Could not upgrade user number:', userToUpgrade);

      res.sendStatus(403);
    }

  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });

});

router.get('/usersearch', rejectUnauthenticated, (req, res) => {
  const searchTerm = [`%${req.query.q}%`];
  console.log(searchTerm);

  const queryText = `
    SELECT * FROM "user"
    WHERE "username" ILIKE $1
    OR "first_name" ILIKE $1
    OR "last_name" ILIKE $1;
  `;

  pool.query(queryText, searchTerm)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});


// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
