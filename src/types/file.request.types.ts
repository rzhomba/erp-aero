import { Request, Response } from 'express'
import { FileData } from './file.types'

export interface FileResponse extends Response<Partial<FileData>> {
}

export interface FileRequest extends Request<{}, FileResponse, {}> {
  params: { id: string }
}

interface FileListData {
  list: FileData[]
}

export interface FileListResponse extends Response<FileListData> {
}

export interface FileListRequest extends Request {
  query: {
    list_size: string
    page: string
  }
}
