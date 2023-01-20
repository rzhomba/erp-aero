import { dbUser, dbPass, dbName, dbHost, dbPort } from './utils/env'

module.exports = {
  development: {
    username: dbUser,
    password: dbPass,
    database: dbName,
    host: dbHost,
    port: dbPort,
    dialect: 'mysql'
  }
}
