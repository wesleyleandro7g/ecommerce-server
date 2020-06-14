require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports = {
  async sendEmailToRegister() {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    transporter
      .sendMail({
        from: "wesleyleandrosantos14@gmail.com",
        to: "desencoder@gmail.com",
        subject: "teste",
        text: "teste",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
