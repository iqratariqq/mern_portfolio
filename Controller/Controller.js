const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");


//transport function -->connect sendgrid account to this
const transport = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.API_SENGRID,
    },
  })
);

const controler = (req, res) => {
  const { name, email, message } = req.body;
  //validation
  if (!name || !email || !message) {
    return res.status(500).send({
      success: false,
      message: "Please provide all fields :)",
    });
  }
  //email matter
  transport.sendMail({
    to: "iqrat269@gmail.com",
    from: "iqrat269@gmail.com",
    subject: "Regarding Mern portfolio",
    html: `
        <h5>Detail Information</h5>
        <ul>
        <li> <p> name: ${name}</p></li>
         <li> <p> email: ${email}</p></li>
          <li> <p> message: ${message}</p></li>
        </ul>
        `,
  });


  try {
    return res.status(200).send({
      success: true,
      message: "message send",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "API error",
      error,
    });
  }
};

module.exports = { controler };
