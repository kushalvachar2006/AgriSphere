// seed/seed.js — populates MongoDB with demo data (spec section 18).
// Run with: npm run seed
import 'dotenv/config';
import mongoose from 'mongoose';
import Farmer from '../models/Farmer.js';
import Market from '../models/Market.js';
import Buyer from '../models/Buyer.js';
import Storage from '../models/Storage.js';
import Logistics from '../models/Logistics.js';
import PriceHistory from '../models/PriceHistory.js';
import ArrivalVolume from '../models/ArrivalVolume.js';           // Feature 1
import ProcurementHistory from '../models/ProcurementHistory.js'; // Feature 2
import Offer from '../models/Offer.js';                            // Feature 3
import {
  demoFarmer, additionalFarmers, markets, buyers, storageFacilities, logisticsOptions,
  generatePriceHistory, generateArrivalVolumeHistory, generateProcurementHistory,
} from './seedData.js';

async function run() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/agrisphere';
  await mongoose.connect(uri);
  console.log('Connected to', uri);

  await Promise.all([
    Farmer.deleteMany({}),
    Market.deleteMany({}),
    Buyer.deleteMany({}),
    Storage.deleteMany({}),
    Logistics.deleteMany({}),
    PriceHistory.deleteMany({}),
    ArrivalVolume.deleteMany({}),
    ProcurementHistory.deleteMany({}),
    Offer.deleteMany({}),
  ]);
  console.log('Cleared existing demo collections.');

  await Farmer.create(demoFarmer);
  await Farmer.insertMany(additionalFarmers);
  await Market.insertMany(markets.map((m) => ({ ...m, source: 'DEMO_SEED' })));
  await Buyer.insertMany(buyers.map((b) => ({ ...b, isDemoData: true })));
  await Storage.insertMany(storageFacilities);
  await Logistics.insertMany(logisticsOptions);
  await PriceHistory.insertMany(generatePriceHistory());
  await ArrivalVolume.insertMany(generateArrivalVolumeHistory().map((r) => ({ ...r, source: 'DEMO_SEED' })));
  await ProcurementHistory.insertMany(generateProcurementHistory());
  // Offers start empty — they're created live during the demo via the
  // Digital Offer & Negotiation System (Feature 3), not seeded.

  const institutionalCount = buyers.filter((b) => b.buyerType !== 'Trader/Aggregator').length;

  console.log('Seed complete:');
  console.log(`  Farmer: Ramesh Kumar (demo login) + ${additionalFarmers.length} additional standalone farmers (buyer-discoverable only)`);
  console.log(`  Markets: ${markets.length} (APMC + eNAM channels)`);
  console.log(`  Buyers: ${buyers.length} total, incl. ${institutionalCount} institutional buyers (Processor/Retail Chain/Exporter/Government Agency)`);
  console.log(`  Storage facilities: ${storageFacilities.length}`);
  console.log(`  Logistics routes: ${logisticsOptions.length}`);
  console.log(`  Price history points: synthetic, ~60 days per crop/market`);
  console.log(`  Arrival volume points: synthetic, ~60 days per crop/market`);
  console.log(`  Procurement history points: synthetic, 12 months per buyer/crop`);
  console.log('NOTE: All buyer names and most price/arrival/procurement data are');
  console.log('synthetic demo data for this SIH 2026 hackathon prototype, NOT official');
  console.log('AGMARKNET/eNAM data.');

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});