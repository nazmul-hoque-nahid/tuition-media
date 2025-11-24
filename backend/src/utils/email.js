import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
export const sendOTPEmail = async (toEmail, otp) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email content
    const mailOptions = {
      from: `"From" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It expires in 10 minutes.`,
      html: `<p>Your OTP code is <b>${otp}</b>. It will expires in 10 minutes.</p>`,
    }

    // Send email
    await transporter.sendMail(mailOptions)
    //console.log(`OTP sent to ${toEmail}: ${otp}`)
  } catch (err) {
    console.error("Error sending OTP email:", err.message)
    throw new Error("Could not send OTP email")
  }
}

export const sendResetEmail = async (toEmail, resetLink) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Reset Password" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: 'Password Reset',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 1 hour.</p>`
  });
};