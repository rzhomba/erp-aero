import express from 'express'
import authRoutes from './auth.route'
import fileRoutes from './file.route'

const router = express.Router()

router.use('', authRoutes)
router.use('/file', fileRoutes)

export default router
