'use strict';

const express = require('express');
const router = new express.Router();
const Driver = require('../db/models').Driver;

router.get('/', (req, res, next) => {
  Driver.findAll({
    order:
    [['firstName', 'ASC']]
  })
    .then( drivers => res.json( drivers ))
    .catch( next )
})

router.post('/existingdriver', (req, res, next) => {
  console.log('*** routers existingdriver req.body: ', req.body)
  const driverId = req.body.id;

    const driverObj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      ssn: req.body.ssn,
      driversLicense: req.body.driversLicense,
      dob: req.body.dob,
      hireDate: req.body.hireDate,
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      phone: req.body.phone,
      email: req.body.email,
      employedBy: req.body.employedBy,
      currentRate: req.body.currentRate,
      earnings: req.body.earnings,
    }

    Driver.findOne({
      where: { id: driverId }
    })
    .then( driver => {
      if(!driver){
        return res.status(404).send({
          message: "Driver Not Found"
        })
      }
      driver.update(driverObj)
    })
    .catch( (error) => res.status(400).send(error))
})

router.post('/', (req, res, next) => {
  console.log('*** post driver: ', req.body)

    const driverObj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      ssn: req.body.ssn,
      driversLicense: req.body.driversLicense,
      dob: req.body.dob,
      hireDate: req.body.hireDate,
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      phone: req.body.phone,
      email: req.body.email,
      employedBy: req.body.employedBy,
      currentRate: req.body.currentRate,
      earnings: req.body.earnings,
    }
    console.log("DRIVER OBJ: ", driverObj)
    Driver.create( driverObj )
    .then( driver => {
      console.log('*** Driver posted to db ', driver);
      res.json( driver )
    })
    .catch( (error) => res.status(400).send(error))
})

router.delete('/deletedriver/:driverId', (req, res, next) => {
  console.log('*** delete driver ', req.params)
  Driver.destroy({
    where: {
      id: req.params.driverId
    }
  })

  .then( (d) => {
    console.log('driver destroyed ', d)
    res.status(204).end()}
  )
  .catch( (error) => res.status(400).send(error))

})


module.exports = router;
