const Booking = require('../models/Booking');
const Expert = require('../models/Expert');

const createBooking = async (req, res, next) => {
  try {
    const { expertId, name, email, phone, date, timeSlot, notes } = req.body;

    const expert = await Expert.findById(expertId);
    if (!expert) {
      return res.status(404).json({ message: 'Expert not found' });
    }

    if (!expert.availableSlots.includes(timeSlot)) {
      return res.status(400).json({ message: 'Selected time slot is invalid for this expert' });
    }

    const booking = await Booking.create({
      expert: expertId,
      name,
      email,
      phone,
      date,
      timeSlot,
      notes: notes || ''
    });

    return res.status(201).json({
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        message: 'This slot has already been booked. Please choose another time.'
      });
    }

    return next(error);
  }
};

const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('expert', 'name category');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    return res.status(200).json({
      message: 'Booking status updated',
      data: booking
    });
  } catch (error) {
    return next(error);
  }
};

const getBookingsByEmail = async (req, res, next) => {
  try {
    const { email } = req.query;

    const bookings = await Booking.find({ email: email.toLowerCase() })
      .populate('expert', 'name category rating')
      .sort({ date: 1, timeSlot: 1, createdAt: -1 });

    return res.status(200).json({ data: bookings });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createBooking,
  updateBookingStatus,
  getBookingsByEmail
};
