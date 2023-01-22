import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`
    cb(null, filename)
  }
})

const upload = multer({
  storage
})

export default upload
