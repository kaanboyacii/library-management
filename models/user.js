import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Loan from './loan.js'; // Import Loan model

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {});

User.associate = (models) => {
  User.hasMany(models.Loan, { foreignKey: 'userId' });
};

export default User;
