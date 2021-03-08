const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const itemRouter = require("./routes/item.router");
const swapRouter = require("./routes/swaps.router");

const userItemRouter = require("./routes/userItem.router");

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

// app.use('/api/userItem', userItemRouter);

// Serve static files
app.use(express.static("build"));

app.use('/s3', require('react-dropzone-s3-uploader/s3router')({
  bucket: process.env.AWS_S3_BUCKET,                           // required
  region: process.env.AWS_S3_REGION,                            // optional
  headers: {'Access-Control-Allow-Origin': '*'},  		    // optional
  ACL: 'public-read',                                 // this is the default - set to `public-read` to let anyone view uploads
}));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
