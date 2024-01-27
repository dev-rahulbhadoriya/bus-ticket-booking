const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define the association with Ticket model
      User.hasMany(models.Ticket, { foreignKey: 'userId', as: 'tickets' });
    }
  }

  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    active: DataTypes.INTEGER,
    deleted: DataTypes.INTEGER,
    token: DataTypes.STRING,
    token_expire: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.isEmailTaken = async (email, excludeUserId) => {
    const user = await User.findOne({
      where: {
        email,
        userId: {
          [Op.ne]: excludeUserId
        }
      }
    });
    return user;
  }

  User.isPasswordMatch = async (password, hash) => {
    return bcrypt.compareSync(password, hash);
  }

  return User;
};
