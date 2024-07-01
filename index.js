require("dotenv").config();
const express = require("express");
const { sendEmail, sendEmailStatus } = require("./sendEmail");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/send-email", async (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(400).send("Missing required parameters");
  }

  const emailSent = await sendEmail(data);
  if (emailSent) {
    return res.status(200).json({ message: "Email sent successfully!" });
  } else {
    return res.status(500).json({ error: "Failed to send email" });
  }
});

app.post("/api/send-email-status", async (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(400).send("Missing required parameters");
  }

  const emailSent = await sendEmailStatus(data);
  if (emailSent) {
    return res.status(200).json({ message: "Email sent successfully!" });
  } else {
    return res.status(500).json({ error: "Failed to send email" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
