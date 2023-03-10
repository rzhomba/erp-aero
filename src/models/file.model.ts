import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize'
import sequelize from '../utils/database'

class File extends Model<InferAttributes<File>, InferCreationAttributes<File>> {
  declare file_id: CreationOptional<number>
  declare user_id: ForeignKey<number>
  declare filename: string
  declare originalname: string
  declare extension: string
  declare mimetype: string
  declare size: number
  declare uploaded: Date
  declare updated: Date
}

File.init({
  file_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  originalname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  extension: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mimetype: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  uploaded: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updated: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, { sequelize, timestamps: false })

export default File
