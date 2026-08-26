// models/Storage.js — a demo cold-storage / warehouse facility.
import mongoose from 'mongoose';

const storageSchema = new mongoose.Schema({
  facilityName: { type: String, required: true },
  location: String,
  type: { type: String, default: 'Cold Storage' },
  capacityTonnes: Number,
  availableCapacityTonnes: Number,
  costPerKgPerDay: Number,
  distanceKm: Number,
}, { timestamps: true });

export default mongoose.model('Storage', storageSchema);
