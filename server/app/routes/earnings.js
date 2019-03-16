'use strict';

const express = require('express');
const router = new express.Router();
const Earning = require('../db/models').Earning;

router.get('/', (req, res, next) => {

  Earning.findAll({
    order:
    [['begWeekDate', 'ASC']]
  })
    .then( earnings => res.json( earnings ))
    .catch( next )
})

router.post('/', (req, res, next) => {
  console.log('*** post earnings: ', req.body)

    const earningsObj = {
      begWeekDate: req.body.begWeekDate,
      endWeekDate: req.body.endWeekDate,
      weekRange: req.body.weekRange,
      revenue: req.body.revenue,
      cancelFeeIncome: req.body.cancelFeeIncome,
      fuelCost: req.body.fuelCost,
      milesPaid: req.body.milesPaid,
      driverPay: req.body.driverPay,
      dispatchFee: req.body.dispatchFee,
      toll: req.body.toll,
      lumper: req.body.lumper,
      detention: req.body.detention,
      detentionDriverPay: req.body.detentionDriverPay,
      secondStopPay: req.body.secondStopPay,
      lateFee: req.body.lateFee,
      roadMaintenance: req.body.roadMaintenance,
      otherExpenses: req.body.otherExpenses,
      totalExpenses: req.body.totalExpenses,
      profit: req.body.profit,
      operatingMargin: Number(req.body.margin.replace("%", "")),
      docFilePath: req.body.docFilePath
    }

    Earning.create( earningsObj )
    .then( earnings => {
      console.log('*** earnings posted to db ', earnings);
      res.json( earnings )
    })
    .catch( (error) => res.status(400).send(error))
})

router.delete('/deleteearnings/:earningsId', (req, res, next) => {
  console.log('*** delete earnings ', req.params)
  Earning.destroy({
    where: {
      id: req.params.earningsId
    }
  })

  .then( (d) => {
    console.log('earning destroyed ', d)
    res.status(204).end()}
  )
  .catch( (error) => res.status(400).send(error))

})


router.post('/existingearnings', (req, res, next) => {

  const earningId = req.body._original.id;
  console.log('*** POST EXISTING EARNINGS: ', req.body, " EARNING_ID: ", earningId)

  const earningsObj = {
    weekNumber: req.body.weekNumber,
    begWeekDate: req.body.begWeekDate,
    endWeekDate: req.body.endWeekDate,
    weekRange: req.body.weekRange,
    revenue: isNaN(req.body.revenue) ? Number(req.body.revenue.replace(",", "")) : req.body.revenue,
    cancelFeeIncome: req.body.cancelFeeIncome,
    fuelCost: req.body.fuelCost,
    milesPaid: req.body.milesPaid,
    driverPay: req.body.driverPay,
    dispatchFee: req.body.dispatchFee,
    toll: req.body.toll,
    lumper: req.body.lumper,
    detention: req.body.detention,
    detentionDriverPay: req.body.detentionDriverPay,
    secondStopPay: req.body.secondStopPay,
    lateFee: req.body.lateFee,
    roadMaintenance: req.body.roadMaintenance,
    otherExpenses: req.body.otherExpenses,
    totalExpenses: req.body.totalExpenses,
    profit: req.body.profit,
    operatingMargin: isNaN(req.body.margin) ? Number(req.body.margin.replace("%", "")) : req.body.margin,
    docFilePath: req.body.docFilePath
  }


  Earning.findById(earningId)
  .then( earning => {
    if(!earning){
      return res.status(404).send({
        message: "Earning Not Found"
      })
    }else{
      earning.update(earningsObj)
    }

  })
  .then( (d) => {
    console.log('earning updated ', d)
    res.status(204).end()}
  )
  .catch( (error) => res.status(400).send(error))


})


module.exports = router;
