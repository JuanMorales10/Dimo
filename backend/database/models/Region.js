
module.exports = (sequelize, DataTypes) => {
    try {
        var Region = sequelize.define("Region",
            {
                region_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                nombre: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                descripcion: {
                    type: DataTypes.STRING,
                    allowNull: true
                }
            },
            {
                tableName: 'region',
                timestamps: false,
            });

    } catch (error) {
        console.log(error)
    }


    Region.associate = function (models) {

        Region.hasMany(models.Service, {
            foreignKey: 'id_region',
            as: 'services', // Esto permite acceder a los servicios de una región como region.services
            timestamps: false
          });

    }

    return Region;
}