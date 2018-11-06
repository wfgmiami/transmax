'use strict';
/* eslint-disable new-cap */
const express = require('express');
const router = new express.Router();

const Candidate = require('../db/models').Candidate;
const Sequelize = require('sequelize');
const nodeMailer = require('nodemailer');
const path = require('path');
const transmaxEmail = 'transmaxfleet@gmail.com';
const GMAIL_PASS = require(path.join(__dirname, '../../env')).GMAIL_PASS;


router.post('/', (req,res,next)=>{

  const createHtmlBody = () => (
    `<html>
      <body>
        <h3>New candidate information:</h3></br>
        Name: ${req.body.firstName} ${req.body.lastName}<br/>
        Email: ${req.body.email}<br/>
        Phone: ${req.body.phone}<br/>
        Street Address: ${req.body.streetAddress}<br/>
        City: ${req.body.city}<br/>
        State: ${req.body.state}<br/>
        Zip Code: ${req.body.zipCode}<br/>
        Driver's License: ${req.body.driversLicense}<br/>
        DOB: ${req.body.dob}<br/>
        Experience: ${req.body.experience}<br/>
        Former Employer: ${req.body.formerEmployer}<br/>
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
    subject: 'New Candidate Application Submitted',
    html: createHtmlBody()
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      return console.log(error)
    }

  })

  Candidate.create(req.body)
  .then( () => Candidate.findAll({ order:  [Sequelize.literal('"firstName" ASC' )]}))
  .then( candidates => {

    res.send(candidates)
  })
  .catch( err => res.status(404).end() )
})

// Make sure this is after all of
// the registered routes!
// router.use(function (req, res) {
//   res.status(404).end();
// });

module.exports = router;
