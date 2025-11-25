import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ===== Send OTP Email =====
export const sendOTPEmail = async (toEmail, otp) => {
  try {
    const msg = {
      to: toEmail,
      from: process.env.FROM_EMAIL,
      subject: "Your OTP Code",
      html: `
      <h1>Your OTP Code</h1>
<p>Use this OTP to verify your account:</p>
<div style="font-size:20px;font-weight:bold">${otp}</div>
<p>This OTP expires in 10 minutes.</p>
<p>If you did not request this, please ignore this email.</p>

      `,
    };

    await sgMail.send(msg);
  } catch (err) {
    console.error("SendGrid OTP Error:", err.response?.body || err.message);
    throw new Error("Could not send OTP email");
  }
};

// ===== Send Reset Password Email =====
export const sendResetEmail = async (toEmail, resetLink) => {
  try {
    const msg = {
      to: toEmail,
      from: process.env.FROM_EMAIL,
      subject: "Password Reset",
      html: `
        <p>Click the link below to reset your password:</p>
        <p><a href="${resetLink}" target="_blank">Reset Password</a></p>
        <p>This link expires in 1 hour.</p>
      `,
    };

    await sgMail.send(msg);
  } catch (err) {
    console.error("SendGrid Reset Error:", err.response?.body || err.message);
    throw new Error("Could not send password reset email");
  }
};
