const Expert = require('../models/Expert');
const Booking = require('../models/Booking');
const { buildUpcomingDateKeys, groupSlotsWithBookings } = require('../utils/slotUtils');

const getExperts = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 8, 1), 50);
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.search) {
      filter.name = { $regex: req.query.search.trim(), $options: 'i' };
    }

    const [experts, total] = await Promise.all([
      Expert.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Expert.countDocuments(filter)
    ]);

    return res.status(200).json({
      data: experts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    return next(error);
  }
};

const getExpertById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expert = await Expert.findById(id);

    if (!expert) {
      return res.status(404).json({ message: 'Expert not found' });
    }

    const dates = buildUpcomingDateKeys(7);
    const bookings = await Booking.find({
      expert: expert._id,
      date: { $in: dates }
    }).select('date timeSlot -_id');

    const bookedMap = bookings.reduce((acc, booking) => {
      if (!acc[booking.date]) {
        acc[booking.date] = [];
      }
      acc[booking.date].push(booking.timeSlot);
      return acc;
    }, {});

    const availableSlotsByDate = groupSlotsWithBookings({
      availableSlots: expert.availableSlots,
      dates,
      bookedMap
    });

    return res.status(200).json({
      data: {
        ...expert.toObject(),
        availableSlotsByDate
      }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getExperts,
  getExpertById
};
