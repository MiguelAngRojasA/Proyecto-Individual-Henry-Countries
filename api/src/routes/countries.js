const express = require("express");
const router = express.Router();

const {getAllCountries, getCountryById, getCountryByName,routeNotfound} = require("../controllers/countries")
 
router.get("/all",getAllCountries)
router.get("/name",getCountryByName)
router.get("/:id",getCountryById)
router.use('*', routeNotfound);


module.exports= router