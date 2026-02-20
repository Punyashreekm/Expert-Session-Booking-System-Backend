const express = require('express');
const {
  createBooking,
  updateBookingStatus,
  getBookingsByEmail
} = require('../controllers/bookingController');
const {
  createBookingValidation,
  updateBookingStatusValidation,
  getBookingsValidation
} = require('../middleware/validators');

const router = express.Router();

router.post('/', createBookingValidation, createBooking);
router.patch('/:id/status', updateBookingStatusValidation, updateBookingStatus);
router.get('/', getBookingsValidation, getBookingsByEmail);

module.exports = router;
