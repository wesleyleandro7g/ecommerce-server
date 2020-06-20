require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports = {
  sendEmailToRegister({ email, passwordTemp, nome }) {
    const subject = "Ecommerce - Confirmação de cadastro.";
    const mensage = `Sucesso! Sua empresa agora faz parte do nosso sistema de ecommerce!!! Para acessar a sua conta utilize essas credenciais: [Usuario = "ADM"], [Senha = "${passwordTemp}"], [Empresa = "${nome}"]. Lembre-se de alterar sua senha apos o primeiro login. Boas Vendas`;

    const transport = nodemailer.createTransport({
      host: "smtp.mail.yahoo.com",
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    transport
      .sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: mensage,
      })
      .then((response) => {
        console.log({ success: response });
      })
      .catch((error) => {
        console.log({ erro: error });
      });
  },
};
