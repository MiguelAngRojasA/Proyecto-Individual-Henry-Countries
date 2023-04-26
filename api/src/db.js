require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const axios = require("axios");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`,
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
async function savaCountriesInDataBase() {
  try {

    const count = await CountryData.count();
    //console.log("El numero de country es de "+ count )

  if (count!== 250){
    const answer = await axios.get("https://restcountries.com/v3.1/all");
    const country = answer.data;

    console.log(country.length)
    // Guarda cada país en la base de datos
    for (let i=0; i<country.length ;i++ ) {      

      await CountryData.create({
        id:country[i].cca3,
        name: country[i].name.common,
        image: country[i].flags.png,
        capital: country[i].capital ? country[i].capital[0] : "",
        continent:country[i].continents.join(""),
        subregion: country[i].subregion,
        area: country[i].area,
        population: country[i].population,
      });     
    }
    console.log("Todos los países se han guardado en la base de datos.");
  }    
  } catch (error) {
    console.error("Error al guardar los países en la base de datos:", error);
  }
}
// Llama la función para guardar todos los países en la base de datos al iniciar el servidor
savaCountriesInDataBase();

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { CountryData, Activity } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
