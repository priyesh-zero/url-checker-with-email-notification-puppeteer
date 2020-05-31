var nodemailer = require('nodemailer');

const notifier = require('node-notifier');

const path = require('path');

const { exec } = require('child_process')

const sendNotification = (url) => {
  notifier.notify(
    {
      title: 'Broken link alert.',
      message: url,
      icon: path.join(__dirname, 'alert.png'), // Absolute path (doesn't work on balloons)
      sound: true, // Only Notification Center or Windows Toasters
      wait: true, // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
      actions: ['Open Link', 'Snooze'],
    },
    function(err, response, metadata) {
      // Response is response from notification
      if (err) console.error(err)
      switch (response) {
        case 'open link':
          exec(`explorer ${url} &`, (err, stdout, stderr) => {
            if (err) console.log(err)
          })
          break
        case 'timeout':
          console.log(`Missed notification for ${url}`)
          break
        case 'snooze':
          setTimeout(() => sendNotification(url), 60000)
          break
        default:
          console.log(response)
          break
      }
    }
  );
}

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

module.exports = { defaultReportTemplate, sendMail, sendNotification }
