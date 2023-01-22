import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import moment from 'moment'
import models from '../models'
import { accessTokenSecret, refreshTokenSecret } from '../utils/env'
import { AuthData } from '../types/auth.types'
import { UserData } from '../types/user.types'

const { User } = models

export const getUser = async (id: string) => {
  return await User.findOne({
    where: { id },
    raw: true
  })
}

export const userExists = async (id: string): Promise<boolean> => {
  const exists = await User.findOne({
    where: { id }
  })

  return !!exists
}

export const registerUser = async (id: string, password: string): Promise<boolean> => {
  const passHash = await bcrypt.hash(password, 10)

  const user = await User.create({
    id,
    password: passHash
  })

  return !!user
}

export const loginUser = async (id: string, password: string): Promise<AuthData> => {
  const user = await User.findOne({ where: { id } })
  if (!user) {
    throw new Error('Invalid username or password')
  }

  const check = await bcrypt.compare(password, user.password)
  if (!check) {
    throw new Error('Invalid username or password')
  }

  const accessToken = jwt.sign({
    id: user.id,
    iat: Date.now()
  }, accessTokenSecret, { expiresIn: '10m' })

  const refreshToken = jwt.sign({
    id: user.id,
    iat: Date.now()
  }, refreshTokenSecret, { expiresIn: '24h' })

  return {
    id: user.id,
    accessToken,
    refreshToken
  }
}

export const refreshUserToken = async (refreshToken: string): Promise<string> => {
  const decoded = jwt.verify(refreshToken, refreshTokenSecret) as JwtPayload

  const user = await User.findOne({ where: { id: decoded.id } })
  if (!user) {
    throw new Error('User not found')
  }

  if (user.revoke_refresh_token_until && decoded.exp && user.revoke_refresh_token_until.getTime() >= decoded.exp) {
    throw new Error('Token is not valid')
  }

  return jwt.sign({
    id: user.id,
    iat: Date.now()
  }, accessTokenSecret, { expiresIn: '10m' })
}

export const invalidateAuthToken = async (id: string): Promise<boolean> => {
  const user = await User.findOne({ where: { id } })
  if (!user) {
    return false
  }

  const date = new Date()
  user.revoke_access_token_until = moment(date).add(10, 'm').toDate()
  user.revoke_refresh_token_until = moment(date).add(24, 'h').toDate()

  return true
}

export const authUserToken = async (accessToken: string): Promise<UserData> => {
  let decoded: JwtPayload
  try {
    decoded = jwt.verify(accessToken, accessTokenSecret) as JwtPayload
  } catch {
    throw new Error('Invalid access token')
  }

  const user = await User.findOne({ where: { id: decoded.id } })
  if (!user) {
    throw new Error('Invalid access token')
  }
  const tokenValid = user.user_id !== decoded.id
  const tokenRevoked = !!user.revoke_refresh_token_until &&
    !!decoded.exp &&
    (user.revoke_refresh_token_until.getTime() >= decoded.exp)

  if (!tokenValid || tokenRevoked) {
    throw new Error('Invalid access token')
  }

  return {
    userId: user.user_id,
    id: user.id
  }
}
