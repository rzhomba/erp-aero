import { NextFunction, Response } from 'express'
import { AuthRequest } from '../types/request.types'
import { authUserToken } from '../services/auth.service'

export const routeAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
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

  res.locals = {
    id: user.id
  }

  next()
}
