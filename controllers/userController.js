import User from '../models/user.js';
import Loan from '../models/loan.js';
import Book from '../models/book.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            include: [
                {
                    model: Loan,
                    include: [Book],
                },
            ],
        });

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            points: user.points,
            borrowedBooks: user.Loans.map(loan => ({
                bookId: loan.Book.id,
                title: loan.Book.title,
                borrowedAt: loan.borrowedAt,
                returnedAt: loan.returnedAt
            })),
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        const newUser = await User.create({ name, email });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const borrowBook = async (req, res) => {
    const { userId, bookId } = req.params;
    try {
        const user = await User.findByPk(userId);
        const book = await Book.findByPk(bookId);

        if (!user) return res.status(404).json({ error: 'User not found' });
        if (!book) return res.status(404).json({ error: 'Book not found' });

        const existingLoan = await Loan.findOne({
            where: { userId, bookId, returnedAt: null },
        });

        if (existingLoan) return res.status(400).json({ error: 'Book already borrowed' });

        const loan = await Loan.create({ userId, bookId, borrowedAt: new Date() });
        res.status(201).json(loan);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const returnBook = async (req, res) => {
    const { userId, loanId } = req.params;
    try {
        const loan = await Loan.findOne({ where: { id: loanId, userId, returnedAt: null } });

        if (!loan) return res.status(404).json({ error: 'Loan not found' });

        loan.returnedAt = new Date();
        await loan.save();

        res.json(loan);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
