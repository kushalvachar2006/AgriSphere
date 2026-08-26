// models/Market.js — an APMC/mandi market and its current price snapshot for a crop.
import mongoose from 'mongoose';

const marketSchema = new mongoose.Schema({
  name: { type: String, required: true },        // e.g. "Kolar APMC"
  state: String,
  district: String,
  crop: { type: String, required: true },
  distanceKm: Number,                             // distance from the demo farmer's location
  minPrice: Number,                                // ₹/kg
  modalPrice: Number,                              // ₹/kg — the "typical" price used for comparisons
  maxPrice: Number,                                // ₹/kg
  arrivalQuantityTonnes: Number,
  trend: { type: String, enum: ['up', 'down', 'stable'], default: 'stable' },
  source: { type: String, enum: ['AGMARKNET', 'DEMO_SEED'], default: 'DEMO_SEED' },
  lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Market', marketSchema);
