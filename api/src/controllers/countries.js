const { CountryData, Activity, conn } = require("../db.js");
const STATUS_OK = 200;
const STATUS_ERROR = 404;

function getAllCountries(req, res) {
  try { 
    CountryData.findAll({
      include: {
        model: Activity,
        attributes: ["id", "name", "dificulty", "duration", "season"],
        through: { attributes: [] },
      }
    }).then((countries) => {
      if (countries) {
        res.status(STATUS_OK).json(countries);
      } else {
        res.status(STATUS_ERROR).json({ message: "Countries not found" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
async function getCountryById(req, res) {
  try {  
    const { id } = req.params;
    const country = await CountryData.findAll({
      where: {
        id,
      },
      include: {
        model: Activity,
        attributes: ["id", "name", "dificulty", "duration", "season"],
        through: { attributes: [] },
      },
    });
    if (country.length === 0) {
      res.status(STATUS_ERROR).json({ message: "Country not found" });
      
    } else {
      res.status(200).json(country);
    }
  } catch (error) {
    res.status(STATUS_ERROR).json({ message: error });
  }
}
async function getCountryByName(req, res) {
  const { name } = req.query; 
  if (!name) {
    return res.status(STATUS_ERROR).json({ message: "Name parameter is missing" });
  }
  try {
    const countries = await CountryData.findAll({
      where: conn.where(
        conn.fn("lower", conn.col("name")),
        "LIKE",
        "%" + name.toLowerCase() + "%"
      ),
    });
    if (countries.length === 0) {
      return res
        .status(STATUS_ERROR)
        .json({ message: "No country found with that name" });
    }
    res.status(200).json(countries); 
  } catch (error) {
    res.status(STATUS_ERROR).json({ message: error });
  }
}
function routeNotfound(req, res, next){  
    const error = new Error(`La ruta ${req.path} no existe`);
    error.status = STATUS_ERROR;
    next(error);  


}
module.exports = {
  getAllCountries,
  getCountryById,
  getCountryByName,
  routeNotfound
};
