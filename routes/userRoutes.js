import express from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    borrowBook,
    returnBook
} from '../controllers/userController.js';
import { validateUser } from '../validators/userValidator.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', validateUser, createUser);

router.post('/:userId/borrow/:bookId', borrowBook);
router.post('/:userId/return/:loanId', returnBook);

export default router;
