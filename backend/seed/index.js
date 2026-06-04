require('dotenv').config();
const mongoose = require('mongoose');
const Pathway = require('../models/Pathway');

const canadaCS = require('./canada-cs');

const seedData = [
  canadaCS,
  // Add more pathways here as you research them:
  // require('./australia-cs'),
  // require('./uk-cs'),
  // require('./germany-cs'),
  // require('./canada-data-science'),
  // etc.
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const data of seedData) {
      await Pathway.findOneAndUpdate(
        { country: data.country, specialisation: data.specialisation },
        data,
        { upsert: true, new: true }
      );
      console.log(`Seeded: ${data.country} + ${data.specialisation}`);
    }

    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
