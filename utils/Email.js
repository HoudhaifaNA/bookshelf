const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const AppError = require("./AppError");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.fromEmail = "bookshelfcontact12@gmail.com";
    this.fromName = "Houdhaifa";
  }

  async sendMagicLink() {
    const mailOptions = {
      to: this.to,
      from: {
        email: this.fromEmail,
        name: this.fromName,
      },
      templateId: "d-afda19cde40543c4b952c1ff72e87709",
      dynamic_template_data: {
        url: this.url,
      },
    };

    try {
      await sgMail.send(mailOptions);
    } catch (error) {
      throw new AppError(error.response.body.errors[0].message, error.code);
    }
  }
};
