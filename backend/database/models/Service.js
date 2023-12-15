module.exports = (sequelize, DataTypes) => {
    const alias = "Service";
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_region: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'region',
                key: 'id'
            }
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion:{
            type: DataTypes.STRING,
            allowNull: false
        },
        capacidad:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        atp:{
            type: DataTypes.BOOLEAN
        },
        rating:{
            type: DataTypes.INTEGER
        },
        precio: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        duracion: {
            type: DataTypes.INTEGER,
        },
        direccion: {
            type: DataTypes.STRING,
        },
        disponibilidad: {
            type: DataTypes.BOOLEAN,
        },
        usuario_dni: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        categoria_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'category',
                key: 'id'
            }
        },
        operating_hours_start: {
            type: DataTypes.TIME,
            allowNull: false,
          },
          operating_hours_end: {
            type: DataTypes.TIME,
            allowNull: false,
          },
          operating_days: {
            type: DataTypes.STRING, // Esto podría ser una cadena JSON que contenga un array de días, por ejemplo: '["Monday", "Tuesday", ...]'
            get() {
              const rawValue = this.getDataValue('operating_days');
              return rawValue ? JSON.parse(rawValue) : [];
            },
            set(value) {
              this.setDataValue('operating_days', JSON.stringify(value));
            },
            allowNull: false,
          },
        
    }
    const config = {
        tableName: 'service',
        timestamps: false,
    }
    const Service = sequelize.define(alias, cols, config)


    Service.associate = function (models) {

        Service.belongsTo(models.User, {
            foreignKey: 'usuario_dni',
            as: 'user', // Esto permite acceder al usuario propietario de un servicio como service.user
            timestamps: false
          });
          
          Service.hasMany(models.ServiceImage, {
            foreignKey: 'service_id',
            as: 'images', // Esto permite acceder a las imágenes de un servicio como service.images
            timestamps: false
        });
          
          Service.belongsTo(models.Category, {
            foreignKey: 'categoria_id',
            as: 'category', // Esto permite acceder a la categoría de un servicio como service.category
            timestamps: false
          });
          
          Service.hasMany(models.Order, {
            foreignKey: 'service_id',
            as: 'orders', // Esto permite acceder a los pedidos de un servicio como service.orders
            timestamps: false
          });
          
          Service.hasMany(models.Comment, {
            foreignKey: 'servicio_id',
            as: 'comments', // Esto permite acceder a los comentarios de un servicio como service.comments
            timestamps: false
          });
    }

    return Service;
}


