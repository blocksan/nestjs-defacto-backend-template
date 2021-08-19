// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql2',
    connection:{
      database: process.env.DB_DATABASE || "template",
      host:  process.env.DB_HOST || "localhost",
      password: process.env.DB_PASSWORD || "password",
      port: process.env.DB_PORT || "3306",
      user: process.env.DB_USERNAME || "root",
    }
  }
};