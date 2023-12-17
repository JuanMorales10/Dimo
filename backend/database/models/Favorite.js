module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('Favorite', {
      usuario_dni: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      servicio_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Service',
          key: 'id'
        }
      }
    }, {
      tableName: 'favorite',
      timestamps: false
    });
  
    return Favorite;
  }