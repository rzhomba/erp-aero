import sequelize from '../utils/database'
import User from './user.model'
import File from './file.model'

// File.belongsTo(User, { targetKey: 'user_id' })

sequelize.sync({ alter: false }).then()

export default { User, File }
