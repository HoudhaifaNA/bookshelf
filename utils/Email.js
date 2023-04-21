const nodemailer = require("nodemailer");
const fs = require("fs");
const AppError = require("./AppError");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.templateFile = fs
      .readFileSync("./data/email.html", "utf8")
      .toString()
      .replaceAll("{{url}}", url);
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.NODEMAILER_KEY,
    },
  });

  async sendMagicLink() {
    const mailOptions = {
      from: "Houdhaifa",
      to: this.to,
      subject: "Your login code is valid for 10 minutes",
      html: this.templateFile,
    };

    await this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new AppError(error.message, error.code);
      } else {
        console.log(`Email sent ${info.response}`);
      }
    });
  }
};
