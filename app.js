var express = require("express");
var port = process.env.PORT || 3000;
var app = express();

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shubham.sv1906@gmail.com",
    pass: "ckdktkddkoobklqk", // you your password
  },
});

function sendMail(req, res) {
  // getting dest email by query string
  const dest = req.query.dest;
  const actionType = req.query.action;
  const amount = req.query.amount;
  const mailOptions = {
    from: "GrowSpace Sell & Withdraw alert <shubham.sv1906@gmail.com>", //
    to: dest,
    subject: actionType + " alert", // email subject
    html: `Dear User, you ${actionType} INR ${amount}`,
  };

  // returning result
  return transporter.sendMail(mailOptions, (erro, info) => {
    if (erro) {
      return res.send(erro.toString());
    }
    return res.send("Sended");
  });
}

app.get("/", function (req, res) {
  res.send(JSON.stringify({ Hello: "World" }));
});
app.get("/send-mail", function (req, res) {
  sendMail(req, res);
});
app.listen(port, function () {
  console.log(`Example app listening on port !`);
});
