'use strict';
/* eslint-disable new-cap */
const express = require('express');
const router = new express.Router();
const md5 = require( 'crypto-md5' );
const Candidate = require('../db/models').User;
const Sequelize = require('sequelize');
const nodeMailer = require('nodemailer');
const path = require('path');
const transmaxEmail = 'transmaxfleet@gmail.com';
const GMAIL_PASS = require(path.join(__dirname, '../../env')).GMAIL_PASS;
const User = require('../db/models').User;

router.post('/', (req,res,next) => {
  const {userName, password} = req.body;

  const createHtmlBody = () => (
    `<html>
      <body>
        <h3>Login by:</h3></br>
        Name: ${userName}<br/>
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
    subject: 'New Login',
    html: createHtmlBody()
  }

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if(error){
  //     return console.log(error)
  //   }

    User.findByPassword({ userName, password })
    .then( user => {
      if (!user){
        res.send({ authenticated: false });
      } else{
        res.send({ authenticated: true });
      }

    })
    .catch( next );

  // })

})

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
  res.status(404).end();
});

module.exports = router;
