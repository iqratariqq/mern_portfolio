const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

// Create the SendGrid transport
const transport = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.API_SENGRID, 
    },
  })
);

// Controller function — now async!
const controler = async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).send({
      success: false,
      message: "Please provide all fields 🙂",
    });
  }

  try {
    // ✅ Send the email — and wait for it!
    await transport.sendMail({
      to: "iqrat269@gmail.com",   
      from: "iqrat269@gmail.com",
      subject: "Regarding MERN Portfolio",
      html: `
        <h5>New Portfolio Message</h5>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
      `,
    });

    return res.status(200).send({
      success: true,
      message: "Message sent successfully ✅",
    });
  } catch (error) {
 

    return res.status(500).send({
      success: false,
      message: "API error — could not send email 😢",
      error: error.message,
    });
  }
};

module.exports = { controler };
