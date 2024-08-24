import express from 'express';
import {
    getAllBooks,
    getBookById,
    createBook
} from '../controllers/bookController.js';
import { validateBook } from '../validators/bookValidator.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', validateBook, createBook);

export default router;
