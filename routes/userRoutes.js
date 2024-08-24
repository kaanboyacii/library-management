import express from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    borrowBook,
    returnBook
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);

router.post('/:userId/borrow/:bookId', borrowBook);
router.post('/:userId/return/:loanId', returnBook);
router.post('/:userId/rate/:loanId', returnBook);

export default router;
