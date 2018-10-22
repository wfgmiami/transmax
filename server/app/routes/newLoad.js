'use strict';

const express = require('express');
const router = new express.Router();
const Load = require('../db/models').Load;
const Broker = require('../db/models').Broker;
const Truck = require('../db/models').Truck;
const Company = require('../db/models').Company;


router.post('/', (req, res, next) => {

  console.log('*** post new loads: ', req.body)

  const loadObj = {
    pickupDate: req.body.pickupDate,
    truckId: req.body.truckId,
    driverName: req.body.driverName,
    driverId: req.body.driverId,
    loadNumber: req.body.loadNumber,
    brokerName: req.body.brokerName,
    brokerId: req.body.brokerId,
    shipper:req.body.shipper,
    consignee:req.body.consignee,
    pickUpCityState: req.body.pickUpCityState,
    dropOffCityState: req.body.dropOffCityState,
    pickUpAddress: req.body.pickUpAddress,
    dropOffAddress: req.body.dropOffAddress,
    payment: isNaN(req.body.payment) ? Number(req.body.payment.replace(",", "")) : req.body.payment,
    loadedMiles: isNaN(req.body.loadedMiles) ? Number(req.body.loadedMiles).replace(",", "") : req.body.loadedMiles,
    emptyMiles: req.body.emptyMiles,
    mileage: req.body.mileage,
    dollarPerMile: req.body.dollarPerMile,
    fuelCost: req.body.fuelCost,
    driverPay: req.body.driverPay,
    dispatchFee: req.body.dispatchFee,
    lumper: req.body.lumper,
    detention: req.body.detention,
    detentionDriverPay: req.body.detentionDriverPay,
    secondStopDriverPay: req.body.secondStopDriverPay,
    lateFee: req.body.lateFee,
    toll: req.body.toll,
    roadMaintenance: req.body.roadMaintenance,
    otherExpenses: req.body.otherExpenses,
    totalExpenses: req.body.totalExpenses,
    profit: req.body.profit,
    commodity: req.body.commodity,
    weight: req.body.weight,
    trailer: req.body.trailer,
    confirmFilePath: req.body.confirmFilePath,
  }

//new load with new broker - first create broker with and id, then Load can be created
  if(!req.body.brokerId){

    Broker.create({
      name: req.body.brokerName,
    })
    .then( broker => {
      console.log('broker ', broker, " Brokerid ", broker.dataValues.id)
      loadObj.brokerId = broker.dataValues.id;

      return broker.update({
        bookedLoads: 1,
        totalPayment: Number(loadObj.payment),
        totalLoadedMiles: Number(loadObj.loadedMiles),
        address: "",
        phone: "",
        email: "",
        avgDollarPerMile: 0
      })
      .then( () => {
        return Load.create(loadObj)
      })
      .then( load => {
        console.log('*** new load with NEW broker- load ', load);
        res.json( load )
      })
      .catch( (error) => res.status(400).send(error))
    })

// new load with existing broker
  }else{
    Broker.findOne({
      where: { id: req.body.brokerId},
    })
    .then( broker => {
      const updateBroker = {
        bookedLoads: Number(broker.bookedLoads) + 1,
        totalPayment: Number(broker.totalPayment) +
          loadObj.payment,
        totalLoadedMiles: Number(broker.totalLoadedMiles) +
          loadObj.loadedMiles
      }
      console.log('*** new load with EXISTING broker- updateBroker ', broker, updateBroker);

      return broker.update(updateBroker)
      .then( () => {
        return Load.create(loadObj)
      })
      .then( load => {
        console.log('*** new load with EXISTING broker- load ', load);
        res.json( load )
      })
      .catch( (error) => res.status(400).send(error))

    })

  }

})

module.exports = router;
