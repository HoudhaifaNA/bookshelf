const fs = require("fs");
const path = require("path");

const nodemailer = require("nodemailer");
const handlebars = require("handlebars");

const AppError = require("./AppError");

module.exports = class Email {
  constructor(user, url) {
    this.from = `noreply ${process.env.EMAIL}`;
    this.to = user.email;
    this.url = url;
  }
  newTransport() {
    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // secure:true for port 465, secure:false for port 587
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  async sendAuthLink() {
    try {
      const filePath = path.join(__dirname, "./public/template.html");
      const source = fs.readFileSync(filePath, "utf-8").toString();
      const template = handlebars.compile(source);
      const replacements = {
        url: this.url,
        email: this.to,
      };
      const htmlToSend = template(replacements);

      const mailOptions = {
        from: this.from,
        to: this.to,
        subject: "Sign in to Bookshelf",
        html: htmlToSend,
      };
      await this.newTransport().sendMail(mailOptions);
    } catch (err) {
      console.log(err);
      throw new AppError(err.response.message, err.code);
    }
  }
};
