require('dotenv').config();

const connectDB = require('../config/db');
const Expert = require('../models/Expert');

const experts = [
  {
    name: 'Dr. Sarah Johnson',
    category: 'Career Coaching',
    experience: 12,
    rating: 4.9,
    bio: 'Helps professionals transition into leadership roles.',
    availableSlots: ['09:00', '10:00', '11:00', '14:00', '16:00']
  },
  {
    name: 'Michael Chen',
    category: 'Software Architecture',
    experience: 10,
    rating: 4.8,
    bio: 'Specialized in scalable backend and cloud systems.',
    availableSlots: ['08:00', '09:00', '13:00', '15:00', '17:00']
  },
  {
    name: 'Priya Nair',
    category: 'Product Management',
    experience: 8,
    rating: 4.7,
    bio: 'Guides PMs on product strategy and execution.',
    availableSlots: ['10:00', '11:00', '12:00', '15:00', '18:00']
  },
  {
    name: 'David Lee',
    category: 'Data Science',
    experience: 9,
    rating: 4.6,
    bio: 'Mentor for ML interviews, model deployment, and MLOps.',
    availableSlots: ['09:00', '12:00', '14:00', '16:00', '19:00']
  }
];

const seed = async () => {
  try {
    await connectDB();
    await Expert.deleteMany({});
    await Expert.insertMany(experts);
    console.log('Experts seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed', error);
    process.exit(1);
  }
};

seed();
