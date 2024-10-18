const nodemailer = require('nodemailer');

// Function to send email using nodemailer
const sendEmail = async (email, password, role) => {
    // Create a transporter
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"School Admin" shijinasasi835@gmail.com',
      to: email,
      subject: `Your Password for "${role}" role at School`,
      text: `Here is your password for accessing corresponding data: ${password}`,
    });
  
    console.log('Message sent: %s', info.messageId);
};
  
module.exports = { sendEmail }
