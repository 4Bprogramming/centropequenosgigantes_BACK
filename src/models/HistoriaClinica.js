const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('historiaclinica', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    mensaje:{
        type: DataTypes.TEXT
    },
    fecha:{
        type:DataTypes.STRING,
    },
    hora:{
        type: DataTypes.STRING
    }
  },{
    freezeTableName: true,
    timestamps: false
});
};