const { body, param, query, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  return next();
};

const getExpertsValidation = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('search').optional().isString().trim(),
  query('category').optional().isString().trim(),
  handleValidation
];

const expertIdValidation = [
  param('id').isMongoId().withMessage('Invalid expert id'),
  handleValidation
];

const createBookingValidation = [
  body('expertId').isMongoId().withMessage('Invalid expert id'),
  body('name').isString().trim().isLength({ min: 2, max: 100 }),
  body('email').isEmail().normalizeEmail(),
  body('phone').isString().trim().isLength({ min: 7, max: 20 }),
  body('date').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Date must be in YYYY-MM-DD format'),
  body('timeSlot').matches(/^\d{2}:\d{2}$/).withMessage('Time slot must be in HH:mm format'),
  body('notes').optional().isString().trim().isLength({ max: 500 }),
  handleValidation
];

const updateBookingStatusValidation = [
  param('id').isMongoId().withMessage('Invalid booking id'),
  body('status').isIn(['Pending', 'Confirmed', 'Completed']),
  handleValidation
];

const getBookingsValidation = [
  query('email').isEmail().withMessage('Valid email query parameter is required'),
  handleValidation
];

module.exports = {
  getExpertsValidation,
  expertIdValidation,
  createBookingValidation,
  updateBookingStatusValidation,
  getBookingsValidation
};
