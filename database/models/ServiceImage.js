
module.exports = (sequelize, DataTypes) => {
    try {
        var ServiceImage = sequelize.define("ServiceImage",
            {
                image_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                service_id: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    references: {
                        model: 'service',
                        key: 'id'
                    }
                },
                url:{
                    type: DataTypes.STRING
                }
            },
            {
                tableName: 'serviceimages',
                timestamps: false,
            });

    } catch (error) {
        console.log(error)
    }


    ServiceImage.associate = function (models) {

        ServiceImage.belongsTo(models.Service, {
            foreignKey: 'service_id',
            as: 'service', // Esto permite acceder al servicio al que pertenece una imagen como serviceImage.service
          });

    }

    return ServiceImage;
}