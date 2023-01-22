import express from 'express'
import { appPort } from './utils/env'
import router from './routes'

const app = express()

app.use(express.json())
app.use(router)

app.listen(appPort, () => {
  console.log(`App listening on port ${appPort}`)
})
