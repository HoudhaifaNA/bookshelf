const sgMail = require("@sendgrid/mail");
const AppError = require("./AppError");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.fromEmail = "bookshelfofficial1@gmail.com";
    this.fromName = "Bookshelf";
  }

  async sendAuthLink() {
    try {
      const mailOptions = {
        to: this.to,
        from: {
          email: this.fromEmail,
          name: this.fromName,
        },
        templateId: "d-36ebab522a34449d805e9e579fd3175a",
        dynamic_template_data: {
          url: this.url,
        },
      };

      await sgMail.send(mailOptions);
    } catch (err) {
      throw new AppError(err.response.body.errors[0].message, err.code);
    }
  }
};
