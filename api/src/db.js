require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const {DB_USER, DB_PASSWORD, DB_HOST,DB_NAME,DB_PORT, DATABASE_URL } = process.env;
const axios = require("axios");
const pg = require('pg');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, 
    native: false, 
    dialectModule: pg,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// We read all the files from the Models folder, request them and add them to the modelDefiners array.
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Inject the connection (sequelize) to all the models
modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// In sequelize.models are all imported models as properties.

const { CountryData, Activity } = sequelize.models;

// Relations
CountryData.belongsToMany(Activity, {
  through: "ActivityCountry",
  timestamps: false,
});
Activity.belongsToMany(CountryData, {
  through: "ActivityCountry",
  timestamps: false,
});

// Function to store all countries in the database
async function saveCountriesInDataBase() {
  try {
    const count = await CountryData.count(); 

    if (count !== 250) {
      const answer = await axios.get("https://restcountries.com/v3.1/all");
      const country = answer.data;    

     // Wraps the for loop in an asynchronous function
      await Promise.all(
        country.map(async (country) => {
          const { cca3, name, flags, capital, continents, subregion, area, population } = country;

          const countryName = name.nativeName?.spa?.common || name.common || "No name found";

          await CountryData.create({
            id: cca3,
            name: countryName,
            image: flags.png,
            capital: capital?.[0] || "No capital found",
            continent: continents?.join("") || "No continent found",
            subregion: subregion || "No subregion found",
            area,
            population,
          });
        })
      );
     
    }
  } catch (error) {   
    console.error("Data countries not found:", error);
  }
}
// Calls the function to save all countries in the database at server startup
saveCountriesInDataBase();

module.exports = {
  ...sequelize.models, 
  conn: sequelize, 
};
