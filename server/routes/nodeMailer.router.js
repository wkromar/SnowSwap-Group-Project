const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const nodemailer = require("nodemailer");
require('dotenv').config();

router.post('/', async (req, res) => {

    const userId = req.user.id;
    const firstName = req.user.first_name;
    const lastName = req.user.last_name;
    const userName = req.user.username;


    try {

        let transporter = nodemailer.createTransport({
            host: "outlook.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SnowSwapDevEmail, // generated ethereal user
                pass: process.env.SnowSwapDevPass, // generated ethereal password
            },
        });

        let upgradeUser = await transporter.sendMail({
            from: '"The SnowSwaps Devs 👻" <snowswapsdev@outlook.com>', // sender address
            to: "snowswapdevs@gmail.com", // list of receivers
            subject: "Someone wants to upgrade!", // Subject line of email
            text: `
        Hey there SnowSwaps Admin! Looks like ${firstName} ${lastName} (username: ${userName})  would like to become a Superuser.
        Here is their user ID: ${userId}
        `, // plain text body
            // html: "<b>Hey there SnowSwaps Admin! Looks like there's a user who would like to become a Superuser.</b>",
        });

        console.log("Message sent: %s", upgradeUser.messageId);
        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


module.exports = router;