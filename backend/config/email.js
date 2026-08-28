import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (email, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject: subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return { success: true, info };
  } catch (error) {
    console.error("Email sending error: ", error);
    throw new Error("Failed to send email: " + error.message);
  }
};

export const sendPaymentSuccessEmail = async (email, userName, plan, amount, startDate, endDate) => {
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
      <div style="background-color: white; border-radius: 8px; padding: 30px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Payment Successful! 🎉</h2>
        <p>Hi ${userName},</p>
        <p>Thank you for subscribing to <strong>${plan.toUpperCase()}</strong> plan on NepShow!</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Subscription Details:</strong></p>
          <p>Plan: ${plan}</p>
          <p>Amount: $${amount}</p>
          <p>Start Date: ${new Date(startDate).toLocaleDateString()}</p>
          <p>End Date: ${new Date(endDate).toLocaleDateString()}</p>
        </div>
        <p>You can now enjoy unlimited streaming of all premium content!</p>
        <a href="${process.env.FRONTEND_URL}/dashboard" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Go to Dashboard</a>
        <p style="margin-top: 30px; color: #666; font-size: 12px;">Best regards,<br>NepShow Team</p>
      </div>
    </div>
  `;
  return sendEmail(email, "Payment Successful - NepShow Subscription", html);
};

export const sendPaymentFailureEmail = async (email, userName, plan, reason) => {
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
      <div style="background-color: white; border-radius: 8px; padding: 30px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d32f2f;">Payment Failed</h2>
        <p>Hi ${userName},</p>
        <p>Unfortunately, your payment for the <strong>${plan.toUpperCase()}</strong> plan could not be processed.</p>
        <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <p><strong>Reason:</strong> ${reason}</p>
        </div>
        <p>Please try again or use a different payment method.</p>
        <a href="${process.env.FRONTEND_URL}/pricing" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Try Again</a>
        <p style="margin-top: 30px; color: #666; font-size: 12px;">Best regards,<br>NepShow Team</p>
      </div>
    </div>
  `;
  return sendEmail(email, "Payment Failed - NepShow", html);
};

export const sendNewMovieNotificationEmail = async (email, userName, movieTitle, movieDescription) => {
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
      <div style="background-color: white; border-radius: 8px; padding: 30px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">🎬 New Movie Added!</h2>
        <p>Hi ${userName},</p>
        <p>A new movie has been added to NepShow!</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #007bff;">${movieTitle}</h3>
          <p>${movieDescription}</p>
        </div>
        <p>Check it out now!</p>
        <a href="${process.env.FRONTEND_URL}/movies" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Browse Movies</a>
        <p style="margin-top: 30px; color: #666; font-size: 12px;">Best regards,<br>NepShow Team</p>
      </div>
    </div>
  `;
  return sendEmail(email, `New Movie Alert - ${movieTitle}`, html);
};

export const sendSubscriptionExpiringEmail = async (email, userName, expiryDate) => {
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
      <div style="background-color: white; border-radius: 8px; padding: 30px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff9800;">Your Subscription is Expiring Soon! ⏰</h2>
        <p>Hi ${userName},</p>
        <p>Your NepShow subscription will expire on <strong>${new Date(expiryDate).toLocaleDateString()}</strong>.</p>
        <p>Don't miss out on all the amazing content! Renew your subscription now to continue streaming.</p>
        <a href="${process.env.FRONTEND_URL}/pricing" style="background-color: #ff9800; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Renew Subscription</a>
        <p style="margin-top: 30px; color: #666; font-size: 12px;">Best regards,<br>NepShow Team</p>
      </div>
    </div>
  `;
  return sendEmail(email, "Your Subscription is Expiring Soon - NepShow", html);
};

export default transporter;
