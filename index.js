import express from "express";
import nodemailer from "nodemailer";
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", async (req, res) => {
  try {
    let { email } = req.body;
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    //   let transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //       user: testAccount.user, // generated ethereal user
    //       pass: testAccount.pass, // generated ethereal password
    //     },
    //   });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aguchris740@gmail.com",
        pass: "apygrazyklpjqgxy",
      },
    });

    // send mail with defined transport object

    setInterval(async () => {
      let info = await transporter.sendMail({
        from: '"First bank" <firstbank@example.com>', // sender address
        to: "aguchris740@gmail.com", // list of receivers
        subject: "Hello my man", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world? you dont have brain</b>", // html body
      });
    }, 3000);

    console.log("Message sent: %s", info.messageId);
    res.send(info.response);
  } catch (error) {
    console.log(error.message);
  }
});
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
