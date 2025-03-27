import React from "react";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
) {
  try {
    //  Correctly render the email component to HTML
    const emailHtml = await render(
      React.createElement(VerificationEmail, {
        username: username,
        otp: verifyCode,
      })
    );

    // Configure SMTP transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // SSL
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //  Send email using Nodemailer
    await transporter.sendMail({
      from: `"Anonymous Message" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Anonymous Message Verification Code",
      html: emailHtml, // Correctly rendered HTML
    });

    console.log("Email sent successfully!");
    return { success: true, message: "Verification email sent successfully." };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification email." };
  }
}
