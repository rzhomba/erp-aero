import models from '../models'
import { FileData } from '../types/file.types'

const { File } = models

export const getFile = async (fileId: number) => {
  return await File.findOne({
    where: { file_id: fileId }
  })
}

export const registerFile = async (fileData: FileData, userId: number): Promise<boolean> => {
  const { filename, originalname, extension, mimetype, size } = fileData

  const file = await File.create({
    user_id: userId,
    filename,
    originalname,
    extension,
    mimetype,
    size,
    uploaded: new Date(),
    updated: new Date()
  })

  return !!file
}

export const updateFile = async (fileId: number, fileData: FileData) => {
  const { filename, originalname, extension, mimetype, size } = fileData

  await File.update({
    filename,
    originalname,
    extension,
    mimetype,
    size,
    updated: new Date()
  }, {
    where: { file_id: fileId }
  })
}

export const deleteFile = async (fileId: number) => {
  await File.destroy({
    where: { file_id: fileId }
  })
}

export const listFiles = async (offset: number, limit: number) => {
  return await File.findAll({ offset, limit })
}
