//  external imports
const Mailgen = require('mailgen');
const nodemailer = require('nodemailer');

// https://ethereal.email/create
let nodeConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.AUTHOR_EMAIL, // generated ethereal user
    pass: process.env.AUTHOR_PASS, // generated ethereal password
  },
};

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Mailgen',
    link: 'https://mailgen.js/',
  },
});

/** POST: http://localhost:8080/api/registerMail*/
const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = await req.body;
  // console.log(req.body);

  // body of the email
  let email = {
    body: {
      name: username,
      intro:
        text ||
        "Welcome to Daily Tuition!Jikmunn OTP Auth App! We're very excited to have you on board.",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  let emailBody = MailGenerator.generate(email);

  let message = {
    from: process.env.AUTHOR_EMAIL,
    to: userEmail,
    subject: subject || 'Signup Successful',
    html: emailBody,
  };

  // send mail
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(200).json({
        message: 'You should receive an email from us.',
      });
    })
    .catch((error) => {
      // console.log('nodemailer error', error);
      res.status(500).json({
        message: 'Something went wrong!',
      });
    });
};

module.exports = {
  registerMail,
};
