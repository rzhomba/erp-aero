import { NextFunction, Request, Response } from 'express'
import { AuthRefreshRequest, AuthRefreshResponse, AuthRequest, AuthResponse } from '../types/auth.request.types'
import {
  getUser,
  invalidateAuthToken,
  loginUser,
  refreshUserToken,
  registerUser,
  userExists
} from '../services/auth.service'

export const register = async (req: AuthRequest, res: Response, next?: NextFunction) => {
  const { id, password } = req.body
  if (!id || !password) {
    res.status(400)
      .send({})
    if (next) next()
    return
  }

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/g

  if (!id.match(emailRegex) && !id.match(phoneRegex)) {
    res.status(400)
      .send({})
    if (next) next()
    return
  }

  const exists = await userExists(id)
  if (exists) {
    res.status(400)
      .send({})
    if (next) next()
    return
  }

  await registerUser(id, password)

  res.status(200)
    .send({})

  if (next) next()
}

export const login = async (req: AuthRequest, res: AuthResponse, next?: NextFunction) => {
  const { id, password } = req.body
  if (!id || !password) {
    res.status(401)
      .send({})
    if (next) next()
    return
  }

  try {
    const data = await loginUser(id, password)
    res.status(200)
      .send(data)
  } catch {
    res.status(401)
      .send({})
  }

  if (next) {
    next()
  }
}

export const refresh = async (req: AuthRefreshRequest, res: AuthRefreshResponse, next?: NextFunction) => {
  const { refreshToken } = req.body

  try {
    const accessToken = await refreshUserToken(refreshToken)

    res.status(200)
      .send({ accessToken })
  } catch {
    res.status(401)
      .send({})
  }

  if (next) {
    next()
  }
}

export const logout = async (req: Request, res: AuthResponse, next?: NextFunction) => {
  const { userId } = res.locals

  await invalidateAuthToken(userId)

  res.status(200)
    .send()

  if (next) {
    next()
  }
}

export const userInfo = async (req: Request, res: Response, next?: NextFunction) => {
  const { id } = res.locals

  const user = await getUser(id)
  if (!user) {
    res.status(404)
      .send()
  } else {
    res.status(200)
      .send(user)
  }

  if (next) {
    next()
  }
}
