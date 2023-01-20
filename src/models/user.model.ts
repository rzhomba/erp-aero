import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../utils/database'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare user_id: CreationOptional<number>
  declare id: string
  declare password: string
  declare revoke_token_until: Date | null
}

User.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  revoke_token_until: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, { sequelize, timestamps: false })
export default User
