const express = require("express");
const router = express.Router();

const {getAllCountries, getCountryById, getCountryByName} = require("../controllers/countries")
 
router.get("/all",getAllCountries)
router.get("/name",getCountryByName)
router.get("/:id",getCountryById)


module.exports= router