import nodemailer from 'nodemailer';

const sendMail = async ( email ) => {
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
      subject: "Welcome to medlink",
      html: `
        <h2>WELCOME TO MEDLINK</h2>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error(error.message);
  }
};

export default sendMail;
