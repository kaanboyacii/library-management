import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Loan = sequelize.define('Loan', {
  borrowedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  returnedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  score: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 10,
    }
  }
}, {});

Loan.associate = (models) => {
  Loan.belongsTo(models.User, { foreignKey: 'userId' });
  Loan.belongsTo(models.Book, { foreignKey: 'bookId' });
};

export default Loan;
