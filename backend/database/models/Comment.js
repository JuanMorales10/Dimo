
module.exports = (sequelize, DataTypes) => {
    try {
        var Comment = sequelize.define("Comment",
            {
                id_comment: {
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
                servicio_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'service',
                        key: 'id'
                    }
                },
                comentario: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                rating: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'service',
                        key: 'rating'
                    },
                    validate: {
                        min: 1,
                        max: 5
                    }
                },
            },
            {
                tableName: 'comment',
                timestamps: false,
            });

    } catch (error) {
        console.log(error)
    }


    Comment.associate = function (models) {

        Comment.belongsTo(models.User, {
            foreignKey: 'usuario_dni',
            as: 'user', // Esto permite acceder al usuario que hizo el comentario como comment.user
            timestamps: false
          });
          
          Comment.belongsTo(models.Service, {
            foreignKey: 'servicio_id',
            as: 'service', // Esto permite acceder al servicio relacionado con un comentario como comment.service
            timestamps: false
          });

    }

    return Comment;
}