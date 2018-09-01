'use strict';
/* eslint-disable new-cap */

const router = require('express').Router();
const Candidate = require('../db/models').Candidate;
const Sequelize = require('sequelize');

router.post('/candidate', (req,res,next)=>{

  Candidate.create(req.body)
  .then( () => Candidate.findAll({ order:  [Sequelize.literal('"firstName" ASC' )]}))
  .then( candidates => res.send(candidates))
  .catch(next)
})

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
  res.status(404).end();
});

module.exports = router;
