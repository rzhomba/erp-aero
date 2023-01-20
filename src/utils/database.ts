import { Sequelize } from 'sequelize'
import { dbHost, dbName, dbPass, dbPort, dbUser } from './env'

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  dialect: 'mysql',
  host: dbHost,
  port: dbPort,
})

try {
  sequelize.authenticate().then(() => console.log('Connection has been established successfully.'))
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

export default sequelize
