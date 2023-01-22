import express from 'express'
import upload from '../utils/upload'
import { file, fileDelete, fileDownload, fileList, fileUpdate, fileUpload } from '../controllers/file.controller'
import { routeAuth } from '../middleware/auth.middleware'

const router = express.Router()

router.route('/upload').post(routeAuth, upload.single('file'), fileUpload)
router.route('/list').get(routeAuth, fileList)
router.route('/delete/:id').delete(routeAuth, fileDelete)
router.route('/:id').get(routeAuth, file)
router.route('/download/:id').get(routeAuth, fileDownload)
router.route('/update/:id').put(routeAuth, upload.single('file'), fileUpdate)

export default router
