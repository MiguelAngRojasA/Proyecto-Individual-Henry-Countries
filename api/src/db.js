require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DATABASE_URL } = process.env;
//  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_PORT}`, DB_USER, DB_PASSWORD, DB_HOST,DB_NAME,DB_PORT,
const axios = require("axios");

const sequelize = new Sequelize(DATABASE_URL,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    dialect: "postgres",
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { CountryData, Activity } = sequelize.models;

// Aca vendrian las relaciones
CountryData.belongsToMany(Activity, {
  through: "ActivityCountry",
  timestamps: false,
});
Activity.belongsToMany(CountryData, {
  through: "ActivityCountry",
  timestamps: false,
});

// Función para guardar todos los países en la base de datos
async function saveCountriesInDataBase() {
  try {
    const count = await CountryData.count(); 

    if (count !== 250) {
      const answer = await axios.get("https://restcountries.com/v3.1/all");
      const country = answer.data;    

      // Envuelve el bucle for en una función asincrónica
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

      //console.log("Todos los países se han guardado en la base de datos.");
    }
  } catch (error) {   
    console.error("Data countries not found:", error);
  }
}
// Llama la función para guardar todos los países en la base de datos al iniciar el servidor
saveCountriesInDataBase();

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { CountryData, Activity } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
