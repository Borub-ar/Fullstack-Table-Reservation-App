import nodemailer from 'nodemailer';

export const sendVerificationEmailService = async (token: string, email: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const emailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email',
      html: `Click here to verify your email: <a href="http://localhost:5173/auth/verify-email-result?token=${token}">Verify</a>`,
    };

    const info = await transporter.sendMail(emailOptions);
    return info;
  } catch (error) {
    throw error;
  }
};
