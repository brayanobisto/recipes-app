const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // Defino el modelo recipe
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The recipe name is required',
        },
        notEmpty: {
          msg: 'The recipe name is required',
        },
      },
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The summary is required',
        },
        notEmpty: {
          msg: 'The recipe summary is required',
        },
      },
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: 'https://spoonacular.com/recipeImages/157086-312x231.jpg',
    },
    score: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: [[100]],
          msg: "The score can't be greater than 100",
        },
        min: {
          args: [[0]],
          msg: "The score can't be lesser than 0",
        },
      },
    },
    healthScore: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: [[100]],
          msg: "The health score can't be greater than 100",
        },
        min: {
          args: [[0]],
          msg: "The health score can't be lesser than 0",
        },
      },
    },
    instructions: {
      type: DataTypes.TEXT,
    },
    isFromDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
