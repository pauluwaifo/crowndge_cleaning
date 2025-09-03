const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = async (email, fullName, subject, phone, message, state) => {
  // Validate inputs
  if (!email || !fullName || !message) {
    throw new Error("Missing required fields");
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: "",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER || "",
      pass: process.env.EMAIL_PASSWORD || "key here",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Email templates
  const customerTemplate = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
      <h2>Hi, ${fullName}!</h2>
      <p>Thank you for contacting us. Here are your details:</p>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Subject:</strong> ${subject || "Not specified"}</li>
        <li><strong>Email:</strong> ${email}</li>
        ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ""}
        <li><strong>Message:</strong> ${message}</li>
      </ul>
      <p>We'll respond within 24 hours.</p>
      <p>Best regards,<br>Think Biogas Team</p>
    </div>
  `;

  const adminTemplate = `
    <div style="font-family: Arial, sans-serif;">
      <h3>New Contact Form Submission</h3>
      <p><strong>Subject:</strong> ${subject || "Not specified"}</p>
      <p><strong>From:</strong> ${fullName} &lt;${email}&gt;</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      <p><strong>Message:</strong></p>
      <div style="white-space: pre-line">${message}</div>
    </div>
  `;

  try {
    // Send to customer
    await transporter.sendMail({
      from: `"Crownedge Cleaning service" <contact@crownedge.com>`,
      to: email,
      subject: `We've received your inquiry: ${subject || "No subject"}`,
      html: customerTemplate,
    });

    // Send to admin
    await transporter.sendMail({
      from: `"Crownedge Cleaning service" <contact@crownedge.com>`,
      to: process.env.ADMIN_EMAIL || "crownedge@gmail.com ",
      subject: `New inquiry: ${subject || "No subject"}`,
      html: adminTemplate,
    });

    console.log(`Emails sent successfully`);
    if (state && state.length > 2)
      return {
        success: true,
        redirectTo: `/state/${state.replace(/\s+/g, "-").toLowerCase()}`,
      };
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send email");
  }
};
