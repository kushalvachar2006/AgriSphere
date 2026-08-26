// models/Buyer.js — a demo buyer/FPO-aggregator with an open offer.
import mongoose from 'mongoose';

const buyerSchema = new mongoose.Schema({
  name: { type: String, required: true },          // clearly fictional demo names
  cropRequired: { type: String, required: true },
  gradeRequired: String,
  quantityRequiredTonnes: Number,
  offerPricePerKg: Number,
  location: String,
  distanceKm: Number,
  requiredByDate: Date,
  verified: { type: Boolean, default: true },
  paymentReliabilityPct: Number,     // 0-100, used in trust score
  completedTransactions: Number,
  disputedTransactionsPct: Number,   // 0-100
  isDemoData: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Buyer', buyerSchema);
