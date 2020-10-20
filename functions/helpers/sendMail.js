const nodemailer = require('nodemailer');

async function sendMail ({ err, event, smtp_config }) {
  const { eventType, message: eventMessage } = event

  // Environmant variables
  const { 
    smtp_host: SMTP_HOST, 
    smtp_port: SMTP_PORT, 
    smtp_service: SMTP_SERVICE, 
    email_id: EMAIL_ID, 
    email_password: EMAIL_PASSWORD, 
    receiver_email_id: RECEIVER_EMAIL_ID 
  } = smtp_config;

  // Construct an SMTP transporter
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    service: SMTP_SERVICE,
    secure: false,
    auth: {
      user: EMAIL_ID,
      pass: EMAIL_PASSWORD
    },
    debug: false,
    logger: true
  });

  // default message body
  const message = {
    from: `"From: Shashikanth P" <${EMAIL_ID}>`,
    to: RECEIVER_EMAIL_ID
  }

  // Message to be sent
  message.subject = err ? 'Error' : `Firebase Events: ${eventType} Reminder`;
  message.html = err ? err : 
  `<div style="width: 100%; height: 40vh; font-family: sans-serif">
    <div style="max-width: 70%; background-color: #0070F3; margin: 30px auto 0; padding: 10px; border-radius: 10px; text-align: center">
      <h1 style="color: #FFF">${eventMessage}</h1>
    </div>
    <p style="color: #555; font-size: 0.9rem; text-align: center">Sent using Firebase functions | Shashikanth P &#169; 2020</p>
  </div>`;

  transport.sendMail(message, (err, info) => {
    if (err) {
      console.log('Error: ');
      console.log(err);
    } else {
      console.log('Success: ');
      console.log(info);
    }
  });
}

module.exports = sendMail;