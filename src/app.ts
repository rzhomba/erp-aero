import express from 'express'
import { Sequelize } from 'sequelize'
import { dbName, dbUser, dbPass, dbHost, dbPort, appPort } from './utils/env'

const app = express()

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  dialect: 'mysql',
  host: dbHost,
  port: dbPort
})

try {
  sequelize.authenticate().then(() => console.log('Connection has been established successfully.'))
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

app.get('/', (req, res) => {
  res.send('Test')
})

app.listen(appPort, () => {
  console.log(`Example app listening on port ${appPort}`)
})
