import { NextFunction, Request, Response } from 'express'
import { authUserToken } from '../services/auth.service'

export const routeAuth = async (req: Request, res: Response, next: NextFunction) => {
  const tokenHeader = req.headers.authorization
  if (!tokenHeader) {
    res.status(401)
      .send()
    return
  }

  const accessToken = tokenHeader.split(' ')[1]

  let user

  try {
    user = await authUserToken(accessToken)
  } catch {
    res.status(401)
      .send()
    return
  }

  const { userId, id } = user
  res.locals = {
    userId,
    id
  }

  next()
}
