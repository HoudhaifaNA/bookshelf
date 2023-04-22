const nodemailer = require("nodemailer");
const getEmailTemplate = require("../data/getEmailTemplate");
const AppError = require("./AppError");
// console.log("PATH", path.dirname(__dirname));
// const templatePath = path.join(path.dirname, "email.html");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.templateFile = getEmailTemplate();
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
      html: this.templateFile.replaceAll("{{url}}", this.url),
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
