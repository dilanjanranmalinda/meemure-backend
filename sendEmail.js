const nodemailer = require("nodemailer");

exports.sendEmail = async (data) => {
  const { name, email, referenceNumber } = data;

  const serviceEmail = process.env.SERVICE_EMAIL;
  const servicePassword = process.env.SERVICE_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: serviceEmail,
      pass: servicePassword,
    },
  });

  const confirmationMsg = {
    to: email,
    from: serviceEmail,
    subject: "Booking Confirmation",
    text: `Dear ${name},\n\nYour booking reference number ${referenceNumber}. 
    Thank you!`,
  };

  const detailsMsg = {
    to: serviceEmail,
    from: email,
    subject: `New Booking, reference number ${referenceNumber}`,
    text: `Booking details for ${name}:\n\n${JSON.stringify(data, null, 2)}`,
  };

  try {
    await transporter.sendMail(confirmationMsg);

    await transporter.sendMail(detailsMsg);
    return true;
  } catch (error) {
    console.log("Error sending Email!", error);
    return false;
  }
};

exports.sendEmailStatus = async (data) => {
  const { name, email, referenceNumber, status } = data;

  const serviceEmail = process.env.SERVICE_EMAIL;
  const servicePassword = process.env.SERVICE_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: serviceEmail,
      pass: servicePassword,
    },
  });

  const confirmationMsg = {
    to: email,
    from: serviceEmail,
    subject: "Booking Status",
    text: `Dear ${name},\n\nYour booking status with reference number ${referenceNumber} has been changed to ${status}. 
    Thank you!`,
  };

  try {
    await transporter.sendMail(confirmationMsg);
    return true;
  } catch (error) {
    console.log("Error sending Email!", error);
    return false;
  }
};
