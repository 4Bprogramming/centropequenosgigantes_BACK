const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('turno', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
    },
    startTime:{
        type: DataTypes.STRING,
        allowNull:false
    },
    endTime:{
        type: DataTypes.STRING,
        allowNull:false
    },
    date:{
        type: DataTypes.STRING,
        allowNull:false
    },
    
    estado:{
        type: DataTypes.ENUM('pendiente' , 'finalizado', 'cancelado'),
        allowNull:false
    }
  },{
    freezeTableName: true,
    timestamps: false
});
};