const express = require("express");
const router = express.Router();
const countries = require("./countries");
const activities = require("./activities");
const {routeNotfound} = require("../controllers/countries")

 router.use('/countries', countries);
 router.use('/activities', activities);
 router.use('*', routeNotfound);


module.exports = router;
