const nodemailer = require('nodemailer')
import config from '../../config/config';

let smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: config.USER_EMAIL,
      pass: config.EMAIL_PASSWORD,
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
  });

  export default smtpTransport;