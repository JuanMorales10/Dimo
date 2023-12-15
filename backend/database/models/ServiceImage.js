
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
                    type: DataTypes.INTEGER,
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
          as: 'service',
          foreignKey: 'service_id',
          timestamps: false,
        });
      };
      

    return ServiceImage;
}