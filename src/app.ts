import express from 'express'
import { appPort } from './utils/env'

const app = express()

app.get('/', (req, res) => {
  res.send('Test')
})

app.listen(appPort, () => {
  console.log(`Example app listening on port ${appPort}`)
})
