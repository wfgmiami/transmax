'use strict';
/* eslint-disable new-cap */

const router = require('express').Router();

router.use('/candidate', require('./candidate'));
router.use('/contactus', require('./contactus'));
router.use('/signin', require('./signin'));
router.use('/newload', require('./newLoad'));
router.use('/existingload', require('./existingLoad'));
router.use('/fixedcost', require('./fixedCost'));
router.use('/variablecost', require('./variableCost'));
router.use('/inputsvariablecost', require('./inputsVariableCost'));
router.use('/driver', require('./driver'));
router.use('/company', require('./company'));
router.use('/broker', require('./broker'));
router.use('/truck', require('./truck'));
router.use('/earnings', require('./earnings'));
router.use('/pdf', require('./showPdf'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
  res.status(404).end();
});

module.exports = router;
