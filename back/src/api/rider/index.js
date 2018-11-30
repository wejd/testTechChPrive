'use strict';

const express = require('express');
const wrap = require('co-express');

const controller = require('./controller');

const router = express.Router();

router.get('/loyalty/:rider_id', wrap(controller.getLoyaltyInfo));
router.get('/riders/', wrap(controller.getAllRiders));
router.get('/bestrider/', wrap(controller.getBestRiderBasedOnNumberRides));
router.get('/search/:key', wrap(controller.searchRiderByKey));

module.exports = router;
