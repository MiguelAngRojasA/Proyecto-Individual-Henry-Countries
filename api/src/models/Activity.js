const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
 
  sequelize.define("Activity", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING(500),
      
    },

    dificulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    duration: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: 0,
      },
    },

    season: {
      type: DataTypes.ENUM("Summer", "Fall", "Winter", "Spring"),
      allowNull: false,
    },
  },{timestamps: false});
};
