const express = require("express");
const router = express.Router();
const countries = require("./countries");
const activities = require("./activities");


 router.use('/countries', countries);
 router.use('/activities', activities);


module.exports = router;
