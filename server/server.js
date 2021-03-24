const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const cron = require('node-cron');

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const itemRouter = require("./routes/item.router");
const swapRouter = require("./routes/swaps.router");
const mailRouter = require("./routes/nodeMailer.router");
const pool = require("./modules/pool");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/item", itemRouter);
app.use("/api/swaps", swapRouter);
app.use("/api/upgradeUser", mailRouter);

// Serve static files
app.use(express.static("build"));

app.use('/s3', require('react-dropzone-s3-uploader/s3router')({
  bucket: process.env.AWS_S3_BUCKET,                           // required
  region: process.env.AWS_S3_REGION,                            // optional
  headers: { 'Access-Control-Allow-Origin': '*' },  		    // optional
  ACL: 'public-read',                                 // this is the default - set to `public-read` to let anyone view uploads
}));

//node-cron checks every minute on the minute if a swap needs to be opened, set to sale mode or closed base
//on the date.  All changes take place at midnight or a minute after the dates are changed in edit/create swaps.
cron.schedule('0 * * * * *', async () => {
  const getQueryText = `
    SELECT * FROM "swaps"
  `;

  const putStartQueryText = `
    UPDATE "swaps"
    SET "swap_open" = TRUE
    WHERE "id" = $1;
  `;

  const putStopQueryText = `
    UPDATE "swaps"
    SET "swap_open" = FALSE
    WHERE "id" = $1;
  `;

  const getResult = await pool.query(getQueryText);
  await getResult.rows.forEach(async (swap) => {
    if (new Date(swap.sell_date) <= new Date() && new Date(swap.stop_date) > new Date()) {
      //if the sell_date is less than or equal to today and stop date is greater than today, start the swap sale portion
      await pool.query(putStartQueryText, [swap.id]);
    } else if (new Date(swap.stop_date) <= new Date()) {
      //if stop_date is less than or equal to today stop the swap.
      await pool.query(putStopQueryText, [swap.id]);
    }
  });
});


// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
