import express from 'express'
import { login, logout, refresh, register, userInfo } from '../controllers/auth.controller'
import { routeAuth } from '../middleware/auth.middleware'

const router = express.Router()

router.route('/signin').post(login)
router.route('/signin/new_token').post(refresh)
router.route('/signup').post(register)
router.route('/logout').get(routeAuth, logout)
router.route('/info').get(routeAuth, userInfo)

export default router
