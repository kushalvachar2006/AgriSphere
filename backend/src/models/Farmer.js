// models/Farmer.js — a farmer's profile + current crop lot they want to sell.
import mongoose from 'mongoose';

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    village: String,
    district: String,
    state: String,
    lat: Number,
    lng: Number,
  },
  phone: String,
  currentCrop: {
    crop: String,
    quantityTonnes: Number,
    grade: String, // A, B, C
    storageAvailable: Boolean,
  },
}, { timestamps: true });

export default mongoose.model('Farmer', farmerSchema);
