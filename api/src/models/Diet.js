const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // Defino el modelo type
  sequelize.define('diet', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The diet name is required'
        },
        notEmpty: {
          msg: 'The diet name is required'
        }
      }
    }
  })
}
