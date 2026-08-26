// models/Transaction.js — lifecycle of an accepted offer, from creation to payment.
import mongoose from 'mongoose';

const STATUSES = [
  'OFFER_CREATED',
  'OFFER_ACCEPTED',
  'PICKUP_SCHEDULED',
  'IN_TRANSIT',
  'DELIVERED',
  'PAYMENT_RECEIVED',
];

const transactionSchema = new mongoose.Schema({
  farmerName: String,
  buyerName: String,
  crop: String,
  quantityTonnes: Number,
  agreedPricePerKg: Number,
  netRealizationPerKg: Number,
  status: { type: String, enum: STATUSES, default: 'OFFER_CREATED' },
  history: [{ status: String, at: { type: Date, default: Date.now } }],
}, { timestamps: true });

transactionSchema.statics.STATUSES = STATUSES;

export default mongoose.model('Transaction', transactionSchema);
