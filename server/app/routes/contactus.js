'use strict';
/* eslint-disable new-cap */
const express = require('express');
const router = new express.Router();

const nodeMailer = require('nodemailer');
const path = require('path');
const transmaxEmail = 'transmaxfleet@gmail.com';
const GMAIL_PASS = require(path.join(__dirname, '../../env')).GMAIL_PASS;


router.post('/', (req,res,next)=>{

  const createHtmlBody = () => (
    `<html>
      <body>
        <h3>Contact form submitted:</h3></br>
        Name: ${req.body.firstName} ${req.body.lastName}<br/>
        Email: ${req.body.email}<br/>
        Phone: ${req.body.phone}<br/>
        Comment: ${req.body.comment}<br/>
      </body>
    </html>`

  )

  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'transmaxfleet@gmail.com',
      pass: GMAIL_PASS
    }
  })

  let mailOptions = {
    from: '"Admin"<admin@transmaxfleet.com>',
    to: transmaxEmail,
    subject: 'Contact form submitted',
    html: createHtmlBody()
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      return console.log(error)
    }
    res.send();
  })


})

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
  res.status(404).end();
});

module.exports = router;
