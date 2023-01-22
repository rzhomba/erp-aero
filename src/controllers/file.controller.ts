import * as fs from 'fs'
import * as path from 'path'
import appRoot from 'app-root-path'
import { NextFunction, Request, Response } from 'express'
import { deleteFile, getFile, listFiles, registerFile, updateFile } from '../services/file.service'
import { FileListRequest, FileListResponse, FileRequest, FileResponse } from '../types/file.request.types'

export const fileUpload = async (req: Request, res: Response, next?: NextFunction) => {
  if (!req.file) {
    res.status(400)
      .send()
    if (next) next()
    return
  }

  const { filename, originalname, mimetype, size } = req.file
  const extension = `.${originalname.split('.').at(-1)}`

  const { userId } = res.locals

  await registerFile({
    filename,
    originalname,
    extension,
    mimetype,
    size
  }, userId)

  res.status(200).send()

  if (next) next()
}

export const fileDownload = async (req: FileRequest, res: Response, next?: NextFunction) => {
  const { id } = req.params
  const fileId = Number(id)

  const file = await getFile(fileId)
  if (!file) {
    res.status(400)
      .send()
  } else {
    const filepath = path.join(appRoot.toString(), '/uploads/', file.filename)
    res.download(filepath)
  }

  if (next) next()
}

export const fileUpdate = async (req: FileRequest, res: Response, next?: NextFunction) => {
  const { id } = req.params
  const fileId = Number(id)

  const file = await getFile(fileId)
  if (!file || !req.file) {
    res.status(400)
      .send()
    if (next) next()
    return
  }

  const { filename, originalname, mimetype, size } = req.file
  const extension = `.${originalname.split('.').at(-1)}`

  fs.unlink(path.join(appRoot.toString(), '/uploads/', file.filename), async () => {
    await updateFile(fileId, {
      filename,
      originalname,
      extension,
      mimetype,
      size
    })

    res.status(200)
      .send()
    if (next) next()
  })
}

export const fileDelete = async (req: FileRequest, res: Response, next?: NextFunction) => {
  const { id } = req.params
  const fileId = Number(id)

  const file = await getFile(fileId)
  if (!file) {
    res.status(400)
      .send()
    if (next) next()
    return
  }

  const { userId } = res.locals
  if (file.user_id !== userId) {
    res.status(400)
      .send()
  } else {
    await deleteFile(fileId)

    fs.unlink(path.join(appRoot.toString(), '/uploads/', file.filename), () => {
      res.status(200)
        .send()

      if (next) next()
    })
  }
}

export const fileList = async (req: FileListRequest, res: FileListResponse, next?: NextFunction) => {
  const { list_size, page } = req.query

  const limit = Number(list_size ?? 10)
  const offset = Number(page ?? 0) * limit

  const files = await listFiles(offset, limit)

  res.status(200)
    .send({ list: files })

  if (next) next()
}

export const file = async (req: FileRequest, res: FileResponse, next?: NextFunction) => {
  const { id } = req.params
  const fileId = Number(id)

  const file = await getFile(fileId)
  if (!file) {
    res.status(400)
      .send()
  } else {
    res.status(200)
      .send(file)
  }

  if (next) next()
}
