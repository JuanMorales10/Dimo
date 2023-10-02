module.exports = (sequelize, DataTypes) => {
    const alias = 'User'
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
        },
        apellido:{
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true 
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono:{
            type: DataTypes.INTEGER,
        },
        ciudad:{
            type: DataTypes.STRING,
        },
        direccion:{
            type: DataTypes.STRING,
        },
        avatar: {
            type: DataTypes.STRING,
        }
    }
    const config = {
        tableName: 'user',
        timestamps: false,
    }

    const User = sequelize.define(alias, cols, config)

    User.associate = function (models) {
        User.hasMany(models.Service, {
            foreignKey: 'usuario_dni',
            as: 'services', // Esto permite acceder a los servicios de un usuario como user.services
          });
          
          User.hasMany(models.Order, {
            foreignKey: 'usuario_dni',
            as: 'orders', // Esto permite acceder a los pedidos de un usuario como user.orders
          });
          
          User.hasMany(models.Comment, {
            foreignKey: 'usuario_dni',
            as: 'comments', // Esto permite acceder a los comentarios de un usuario como user.comments
          });
    }

    return User;
}