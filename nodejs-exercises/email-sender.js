const nodemailer = require('nodemailer');

async function sendEmail() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const to = process.env.EMAIL_TO || user;

  if (!user || !pass) {
    console.error('Set EMAIL_USER and EMAIL_PASS in your environment variables.');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  const info = await transporter.sendMail({
    from: user,
    to,
    subject: 'Test Node.js Email Sender',
    text: 'Hello from Nodemailer!',
  });

  console.log('Email sent:', info.response);
}

sendEmail().catch((error) => {
  console.error('Email send error. Verify EMAIL_USER/EMAIL_PASS, internet access, and SMTP permissions:', error);
});
