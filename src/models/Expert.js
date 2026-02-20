const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    experience: {
      type: Number,
      required: true,
      min: 0
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    bio: {
      type: String,
      default: ''
    },
    availableSlots: {
      type: [String],
      default: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Expert', expertSchema);
