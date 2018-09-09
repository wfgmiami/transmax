'use strict';

const express = require('express');
const router = new express.Router();
const path = require('path');
const fs = require('fs');

router.post('/', function (req, res, next) {

  const { docLink } = req.body;

  var file = fs.createReadStream(docLink);
  var stat = fs.statSync(docLink);

  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
  file.pipe(res);

});


module.exports = router;
