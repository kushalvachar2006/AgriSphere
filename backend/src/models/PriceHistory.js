// models/PriceHistory.js — synthetic daily modal-price history used for trend charts.
import mongoose from 'mongoose';

const priceHistorySchema = new mongoose.Schema({
  crop: { type: String, required: true },
  market: { type: String, required: true },
  date: { type: Date, required: true },
  modalPrice: { type: Number, required: true },
}, { timestamps: true });

priceHistorySchema.index({ crop: 1, market: 1, date: 1 });

export default mongoose.model('PriceHistory', priceHistorySchema);
