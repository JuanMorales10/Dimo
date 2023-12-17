module.exports = {
  "development": {
    "username": "root",
    "password": "root",
    "database": "whatodo",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "-03:00" 
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "-03:00" // UTC
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "-03:00" // UTC
  }
}
