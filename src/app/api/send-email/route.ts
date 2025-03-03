// components/utils/nodemailer.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your email password or app password
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email
    to, // Recipient email
    subject, // Email subject
    html, // Email content (HTML)
  };

  await transporter.sendMail(mailOptions);
};