import { config } from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
const app = express();
config();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/spam", async (req, res) => {
  try {
    let { email, subject } = req.body;
    if (!email || !subject) {
      throw Error("Missing Credentials");
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.PASS,
      },
    });

    // send mail with defined transport object

    let info = await transporter.sendMail({
      from: '"Anonymous" <dev@gmail.com>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world? you dont have brain</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    res.end(info.response);
  } catch (error) {
    res.status(501).send(error.message);
  }
});
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
