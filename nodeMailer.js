const nodemailer = require("nodemailer");


async function main() {

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
            from: '"The SnowSwap Devs 👻" <snowswapsdev@outlook.com>', // sender address
            to: "greenmonkee3333@gmail.com, greenmonkee3333@yahoo.com", // list of receivers
            subject: "TEST EMAIL PLEASE IGNORE ✔", // Subject line
            text: "WOW, THIS WAS SO SIMPLE TO SET UP. This concludes out test.", // plain text body
            html: "<b>Hello?</b>",
        });

        console.log("Message sent: %s", upgradeUser.messageId);
}

main().catch(console.error);







    // const transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //         user: "snowswapdevs@gmail.com",
    //         pass: "ZhuSnowSwap12"
    //     }
    // });

    // const upgradeUser = {
    //     from: "snowswapdevs@gmail.com",
    //     to: "greenmonkee3333@gmail.com",
    //     subject: "TEST EMAIL PLEASE IGNORE",
    //     text: "WOW, THIS WAS SO SIMPLE TO SET UP. This concludes out test."
    // }