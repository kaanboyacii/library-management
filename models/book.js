import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  averageRating: {
    type: DataTypes.DECIMAL(3,2),
    defaultValue: 0.00
  }
}, {});

Book.associate = (models) => {
  Book.hasMany(models.Loan, { foreignKey: 'bookId' });
};

export default Book;
