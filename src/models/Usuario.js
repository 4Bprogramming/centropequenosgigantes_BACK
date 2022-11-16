const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('usuario', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
   
    nombre:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    email:{
      type:DataTypes.STRING,
      allowNull: false,
    },
   
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.nombre} ${this.apellido}`;
    }
  }

  },{
    freezeTableName: true,
    timestamps: false
});
};
