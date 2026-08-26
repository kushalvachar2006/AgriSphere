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
import { demoFarmer, markets, buyers, storageFacilities, logisticsOptions, generatePriceHistory } from './seedData.js';

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
  ]);
  console.log('Cleared existing demo collections.');

  await Farmer.create(demoFarmer);
  await Market.insertMany(markets.map((m) => ({ ...m, source: 'DEMO_SEED' })));
  await Buyer.insertMany(buyers.map((b) => ({ ...b, isDemoData: true })));
  await Storage.insertMany(storageFacilities);
  await Logistics.insertMany(logisticsOptions);
  await PriceHistory.insertMany(generatePriceHistory());

  console.log('Seed complete:');
  console.log(`  Farmer: Ramesh Kumar (demo)`);
  console.log(`  Markets: ${markets.length}`);
  console.log(`  Buyers: ${buyers.length} (all clearly marked as demo/fictional)`);
  console.log(`  Storage facilities: ${storageFacilities.length}`);
  console.log(`  Logistics routes: ${logisticsOptions.length}`);
  console.log(`  Price history points: synthetic, ~60 days per crop/market`);
  console.log('NOTE: All buyer names and most price data are synthetic demo data');
  console.log('for this SIH 2026 hackathon prototype, NOT official AGMARKNET data.');

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
