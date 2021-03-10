const nodemailer = require("nodemailer");


async function userUpgrade() {

    // let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: "outlook.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'snowswapsdev@outlook.com', // generated ethereal user
                pass: 'ZhuSnowSwap12', // generated ethereal password
            },
        });

        let upgradeUser = await transporter.sendMail({
            from: '"The SnowSwaps Devs 👻" <snowswapsdev@outlook.com>', // sender address
            to: "greenmonkee3333@gmail.com, greenmonkee3333@yahoo.com", // list of receivers
            subject: "Someone wants to upgrade!", // Subject line
            text: "Hey there SnowSwaps Admin! Looks like there's a user who would like to become a Superuser.", // plain text body
            html: "<b>Hey there SnowSwaps Admin! Looks like there's a user who would like to become a Superuser.</b>",
        });

        console.log("Message sent: %s", upgradeUser.messageId);
}

userUpgrade().catch(console.error);

export default userUpgrade;
