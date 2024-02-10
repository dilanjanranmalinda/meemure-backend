const sgMail = require("@sendgrid/mail");
require("dotenv").config();

exports.sendEmail = async (data) => {
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  sgMail.setApiKey(sendgridApiKey);

  const { name, email, referenceNumber } = data;

  const confirmationMsg = {
    to: email,
    from: "kaushikadinith1996@gmail.com",
    subject: "Booking Confirmation",
    text: `Dear ${name},\n\nYour booking reference number ${referenceNumber}. 
    Thank you!`,
  };

  const detailsMsg = {
    to: "dilanjanranmalinda98@gmail.com",
    from: "kaushikadinith1996@gmail.com",
    subject: `New Booking, reference number ${referenceNumber}`,
    text: `Booking details for ${name}:\n\n${JSON.stringify(data, null, 2)}`,
  };

  try {
    await sgMail.send(confirmationMsg);

    await sgMail.send(detailsMsg);
    return true;
  } catch (error) {
    console.log(
      "Error sending Email!",
      error?.code,
      error?.response?.body?.errors
    );
    return false;
  }
};
