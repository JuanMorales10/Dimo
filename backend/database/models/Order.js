
module.exports = (sequelize, DataTypes) => {
    try {
        var Order = sequelize.define("Order",
            {
                order_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                usuario_dni: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'user',
                        key: 'id'
                    }
                },
                service_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'service',
                        key: 'id'
                    }
                },
                fecha: {
                    type: DataTypes.DATE,
                    allowNull: false,
                }
            },
            {
                tableName: 'order',
                timestamps: false,
            });

    } catch (error) {
        console.log(error)
    }


    Order.associate = function (models) {

        Order.belongsTo(models.User, {
            foreignKey: 'usuario_dni',
            as: 'user', // Esto permite acceder al usuario que hizo el pedido como order.user
            timestamps: false
          });
          
          Order.belongsTo(models.Service, {
            foreignKey: 'service_id',
            as: 'service', // Esto permite acceder al servicio relacionado con un pedido como order.service
            timestamps: false
          });
          

    }

    return Order;
}
