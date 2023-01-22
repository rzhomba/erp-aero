import { Request, Response } from 'express'
import { AuthData, UserCredentials } from './auth.types'

export interface AuthResponse extends Response<Partial<AuthData>> {
}

export interface AuthRequest extends Request<{}, AuthResponse, UserCredentials> {
}

interface AuthRefreshData {
  refreshToken: string
}

export interface AuthRefreshResponse extends Response<Partial<AuthData>> {
}

export interface AuthRefreshRequest extends Request<{}, Partial<AuthData>, AuthRefreshData> {
}
