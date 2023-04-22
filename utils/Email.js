const nodemailer = require("nodemailer");
const getEmailTemplate = require("../data/getEmailTemplate");

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
      from: `Houdhaifa ${process.env.EMAIL}`,
      to: this.to,
      subject: "Your login code is valid for 10 minutes",
      html: this.templateFile
        .replace(/{{url}}/g, this.url)
        .replace(/{{email}}/g, this.to),
    };

    await new Promise((resolve, reject) => {
      // send mail
      this.transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(`ERROR 🔥🔥 ${err.message}`);
          reject(err);
        } else {
          console.log(`Email sent ${info.response}`);
          resolve(info);
        }
      });
    });
  }
};
