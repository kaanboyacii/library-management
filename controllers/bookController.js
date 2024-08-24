import Book from '../models/book.js';

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByPk(id);
        if (!book) return res.status(404).json({ error: 'Book not found' });

        res.json(book);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createBook = async (req, res) => {
    const { title, averageRating } = req.body;
    try {
        const newBook = await Book.create({ title, averageRating });
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
