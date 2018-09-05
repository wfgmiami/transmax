'use strict';
/* eslint-disable new-cap */

const router = require('express').Router();

router.use('/candidate', require('./candidate'));
router.use('/contactus', require('./contactus'));
router.use('/signin', require('./signin'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
  res.status(404).end();
});

module.exports = router;
