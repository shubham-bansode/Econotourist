const nodemailer = require('nodemailer')

let btn = document.querySelector("#senddetails");

const transporter = nodemailer.createTransport(
    {
        secure:true,
        host: 'smtp.gmail.com',
        port:465,
        auth:{
            user: 'econotourist07@gmail.com',
            pass: 'woefuejrdsygijka'
        }
    }
);

function sendMail(to,sub,msg){
    transporter.sendMail({
        to:to,
        subject:sub,
        html:msg
    });

    console.log("Message Send");
}

sendMail("econotourist07@gmail.com","Hello","Hello Tejas");