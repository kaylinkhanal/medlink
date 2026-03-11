import nodemailer from 'nodemailer';

const sendMail = async ({ email, code }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Medlink Verification Code",
      html: `
        <h2>Verify Your Account</h2>
        <p>Your verification code is:</p>
        <h1>${code}</h1>
        <p>This code expires in 1 hour.</p>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error(error.message);
  }
};

export default sendMail;
