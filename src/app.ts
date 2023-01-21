import express from 'express'
import { appPort } from './utils/env'
import router from './routes'

const app = express()
app.use(express.json())
app.use(router)

app.get('/', (req, res) => {
  res.send('Test')
})

app.listen(appPort, () => {
  console.log(`Example app listening on port ${appPort}`)
})
