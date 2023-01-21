import dotenv from 'dotenv'

const config = dotenv.config()
if (config.error || !config.parsed) {
  throw config.error
}

export const appPort = Number(process.env.APP_PORT)
export const dbName = String(process.env.DB_NAME)
export const dbUser = String(process.env.DB_USER)
export const dbPass = String(process.env.DB_PASS)
export const dbHost = String(process.env.DB_HOST)
export const dbPort = Number(process.env.DB_PORT)
export const accessTokenSecret = String(process.env.ACCESS_TOKEN_SECRET)
export const refreshTokenSecret = String(process.env.REFRESH_TOKEN_SECRET)
