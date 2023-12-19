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

    Favorite.associate = function(models) {
      // Esta línea establece una relación directa entre Favorite y Service
      Favorite.belongsTo(models.Service, {
        foreignKey: 'servicio_id',
        as: 'service'
      });
  
  
      // Cualquier otra relación con User u otros modelos
      Favorite.belongsTo(models.User, {
        foreignKey: 'usuario_dni',
        as: 'user'
      });
    };
  
    return Favorite;
  }