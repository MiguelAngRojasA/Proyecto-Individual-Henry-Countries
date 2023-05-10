const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('CountryData', {

    id:{
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true

    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.TEXT,
      allowNull: false,
      charset: 'utf8' 
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  },{timestamps: false});
};
