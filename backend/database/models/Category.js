
module.exports = (sequelize, DataTypes) => {
    try {
        var Category = sequelize.define("Category",
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                nombre: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                descripcion:{
                    type: DataTypes.STRING
                }
            },
            {
                tableName: 'category',
                timestamps: false,
            });

    } catch (error) {
        console.log(error)
    }


    Category.associate = function (models) {

        Category.hasMany(models.Service, {
            foreignKey: 'categoria_id',
            as: 'services', // Esto permite acceder a los servicios de una categoría como category.services
            timestamps: false
          });

    }

    return Category;
}
