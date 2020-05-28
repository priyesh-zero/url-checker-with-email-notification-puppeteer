var nodemailer = require("nodemailer");

const { EMAIL, PASSWORD, DISPLAY_NAME } = process.env;

// Create a transporter for the mailer

var transporter = nodemailer.createTransport({
  host: "", // hostname
  secureConnection: true, // TLS requires secureConnection to be false
  port: 465, // port for secure SMTP
  tls: {
    //ciphers:'SSLv3',
    rejectUnauthorized: false,
  },
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

const sendMail = async (sendEmail, emailMessage) => {
  // setup e-mail data, even with unicode symbols
  var mailOptions = {
    from: '"' + DISPLAY_NAME + '" <' + EMAIL + ">", // sender address (who sends)
    to: sendEmail, // list of receivers (who receives)
    subject: "Broken Link", // Subject line
    // text: 'Hello world ', // plaintext body
    html: emailMessage, // html body
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (exp) {
    console.log(`Sending Email to ${sendEmail} failed! \n ${exp}`);
  }
};

// reports
const defaultReportTemplate = (url, statusCode, broken) => ({
  url,
  statusCode,
  broken,
});

module.exports = { defaultReportTemplate, sendMail };
