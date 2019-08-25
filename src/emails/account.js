
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from: "alex.lavriv@gmail.com",
        subject: "Welcome mail",
        text: `Welcome to the app, ${name}. let me know how you along with the app`
    })
}


const sendCancelEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from: "alex.lavriv@gmail.com",
        subject: "Welcome mail",
        text: `Thank you for cancelition ${name}`
    })
}

module.exports = {
   sendWelcomeEmail,
   sendCancelEmail
}