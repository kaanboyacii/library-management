import { body, validationResult } from 'express-validator';

export const validateBook = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 1 }).withMessage('Title must be at least 1 character long'),
    body('averageRating')
        .optional()
        .isDecimal({ decimal_digits: '0,2' }).withMessage('Average rating must be a decimal number with up to 2 decimal places')
        .custom(value => {
            if (parseFloat(value) < 0 || parseFloat(value) > 10) {
                throw new Error('Average rating must be between 0 and 10');
            }
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];