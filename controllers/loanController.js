import { Loan, User, Book } from '../models/index.js';

export const borrowBook = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const bookId = parseInt(req.params.bookId);

    try {
        const user = await User.findByPk(userId);
        const book = await Book.findByPk(bookId);

        if (!user || !book) {
            return res.status(404).json({ error: 'User or Book not found.' });
        }
        const existingLoan = await Loan.findOne({
            where: {
                bookId,
                returnedAt: null
            }
        });

        if (existingLoan) {
            return res.status(400).json({ error: 'Book is already borrowed.' });
        }
        const loan = await Loan.create({
            userId,
            bookId,
            borrowedAt: new Date()
        });

        res.status(201).json(loan);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while borrowing the book.' });
    }
};

export const returnBook = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const bookId = parseInt(req.params.bookId);
    try {
        const user = await User.findByPk(userId);
        const book = await Book.findByPk(bookId);

        if (!user || !book) {
            return res.status(404).json({ error: 'User or Book not found.' });
        }

        const loan = await Loan.findOne({
            where: {
                userId,
                bookId,
                returnedAt: null
            }
        });

        if (!loan) {
            return res.status(404).json({ error: 'Loan record not found.' });
        }

        loan.returnedAt = new Date();
        await loan.save();

        const loans = await Loan.findAll({
            where: { bookId, returnedAt: { [Op.not]: null } }
        });
        const averageRating = loans.reduce((sum, loan) => sum + (loan.rating || 0), 0) / loans.length;
        book.averageRating = averageRating;
        await book.save();

        res.json(loan);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while returning the book.' });
    }
};
