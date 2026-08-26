// models/Buyer.js — a demo buyer/FPO-aggregator with an open offer.
//
// Feature 4 (Institutional Buyer Integration): `buyerType` and `channel`
// distinguish plain traders/wholesalers from institutional buyers
// (processors, retail chains, exporters, government procurement
// agencies), and `requirements` captures the extra quantity/quality/
// delivery conditions institutional buyers typically impose.
//
// Feature 5 (Multi-Channel Market Comparison): `channel` is also the
// field the multi-channel comparison service groups by, alongside
// Market.channel, so APMC/eNAM/Processor/Exporter/Retail/Digital
// Marketplace opportunities can be ranked side by side.
import mongoose from 'mongoose';

const BUYER_TYPES = ['Trader/Aggregator', 'Processor', 'Retail Chain', 'Exporter', 'Government Agency'];
const CHANNELS = ['Direct Trader', 'Processor', 'Retail Chain', 'Exporter', 'Government Procurement', 'Digital Marketplace'];

const requirementsSchema = new mongoose.Schema({
  qualitySpec: String,          // e.g. "Grade A, uniform size, <5% defects"
  deliverySchedule: String,     // e.g. "Weekly, Mon/Thu dispatch"
  packagingRequirement: String, // e.g. "25kg crates, ventilated"
  contractType: String,         // e.g. "Spot", "Seasonal Contract", "Forward Agreement"
}, { _id: false });

const buyerSchema = new mongoose.Schema({
  name: { type: String, required: true },          // clearly fictional demo names
  buyerType: { type: String, enum: BUYER_TYPES, default: 'Trader/Aggregator' },
  channel: { type: String, enum: CHANNELS, default: 'Direct Trader' },
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
  requirements: requirementsSchema,  // only meaningfully populated for institutional buyers
  isDemoData: { type: Boolean, default: true },
}, { timestamps: true });

buyerSchema.statics.BUYER_TYPES = BUYER_TYPES;
buyerSchema.statics.CHANNELS = CHANNELS;

export default mongoose.model('Buyer', buyerSchema);