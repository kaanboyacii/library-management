import { DataTypes, Op } from 'sequelize';
import sequelize from '../config/db.js';
import Loan from './loan.js';

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

Book.updateAverageRating = async (bookId) => {
  try {
    const book = await Book.findByPk(bookId);
    const loans = await Loan.findAll({
      where: {
        bookId,
        returnedAt: { [Op.ne]: null }
      }
    });

    const averageRating = loans.length > 0
      ? loans.reduce((sum, loan) => sum + loan.score, 0) / loans.length
      : 0;

    await book.update({ averageRating });
  } catch (error) {
    console.error('Error updating average rating:', error);
    throw error;
  }
};

export default Book;
