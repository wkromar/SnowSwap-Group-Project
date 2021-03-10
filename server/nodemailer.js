var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'snowswapdevs',
        pass: 'ZhuSnowSwap12'
    }
});

console.log('created');
transporter.sendMail({
    from: 'snowswapdevs@gmail.com',
    to: 'justinappelgren@gmail.com',
    subject: 'hello world!',
    text: 'hello world!'
});