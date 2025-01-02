"use server";
import nodemailer from "nodemailer";

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;

const transporter = nodemailer.createTransport({
  host: SMTP_SERVER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.verify();

    const res = await transporter.sendMail({
      from: SMTP_SERVER_USERNAME,
      to,
      subject,
      html,
    });

    console.log("Email sent successfully", res.messageId);
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
